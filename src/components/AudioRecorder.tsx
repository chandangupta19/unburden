import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, AlertCircle } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogFooter,
} from './ui/alert-dialog';

interface AudioRecorderProps {
  isAnimating: boolean;
  onRecordingComplete: () => void;
  disabled?: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  isAnimating, 
  onRecordingComplete,
  disabled = false 
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [showPermissionError, setShowPermissionError] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [isInCooldown, setIsInCooldown] = useState<boolean>(false);
  const [showCooldownMessage, setShowCooldownMessage] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const MAX_RECORDING_TIME = 300; // 5 minutes in seconds
  const MAX_ATTEMPTS = 5;
  const COOLDOWN_TIME = 60000; // 1 minute in milliseconds

  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      if (mediaRecorder.current && isRecording) {
        mediaRecorder.current.stop();
        setIsRecording(false);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    if (isInCooldown) {
      setShowCooldownMessage(true);
      return;
    }
    
    if (attemptCount >= MAX_ATTEMPTS) {
      setIsInCooldown(true);
      setShowCooldownMessage(true);
      setTimeout(() => {
        setIsInCooldown(false);
        setAttemptCount(0);
        setShowCooldownMessage(false);
      }, COOLDOWN_TIME);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      // We don't store or process the data
      mediaRecorder.current.ondataavailable = () => {};

      mediaRecorder.current.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        onRecordingComplete();
        setAttemptCount(prev => prev + 1);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      startTimer();
    } catch (err) {
      setShowPermissionError(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      stopTimer();
      setRecordingTime(0);
    }
  };

  const startTimer = () => {
    timerInterval.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= MAX_RECORDING_TIME - 1) {
          stopRecording();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const remainingAttempts = MAX_ATTEMPTS - attemptCount;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={disabled || isAnimating || isInCooldown}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
            title="Start speaking"
          >
            <Mic className="w-6 h-6 text-white" />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="p-4 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
            title="Stop speaking"
          >
            <Square className="w-6 h-6 text-white" />
          </button>
        )}
        {isRecording && (
          <div className="text-white/80">
            {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-white/60 text-sm max-w-md">
          {isRecording 
            ? "Speaking... Your voice exists only in this moment and is never stored or recorded." 
            : "Click to start speaking (max 5 minutes). Your voice will exist only in the moment, like speaking into the wind."}
        </p>
        {!isInCooldown && !isRecording && (
          <p className="text-white/40 text-xs mt-2">
            {remainingAttempts} attempts remaining
          </p>
        )}
      </div>

      <AlertDialog open={showPermissionError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="text-white" />
              Microphone Access Required
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-4">
                Please allow microphone access to use the voice feature.
              </p>
              <p className="mb-4">
                For your privacy:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your voice exists only momentarily in your device's memory</li>
                <li>Nothing is ever recorded or stored</li>
                <li>No audio data is sent anywhere</li>
                <li>Everything is discarded instantly</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowPermissionError(false)}>
              Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showCooldownMessage}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Taking a Brief Pause</AlertDialogTitle>
            <AlertDialogDescription>
              You've reached the maximum number of voice releases (5) for now.
              Please wait 1 minute before trying again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowCooldownMessage(false)}>
              Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AudioRecorder;