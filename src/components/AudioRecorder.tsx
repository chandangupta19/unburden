import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Pause, Play, AlertCircle } from 'lucide-react';
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
  onRecordingChange: (isRecording: boolean, time: number) => void;
  disabled?: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  isAnimating, 
  onRecordingComplete,
  onRecordingChange,
  disabled = false 
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [showPermissionError, setShowPermissionError] = useState<boolean>(false);
  const [showMinTimeError, setShowMinTimeError] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const audioStream = useRef<MediaStream | null>(null);

  const MAX_RECORDING_TIME = 300; // 5 minutes in seconds
  const MIN_RECORDING_TIME = 30; // 30 seconds minimum

  useEffect(() => {
    return () => {
      stopTimer();
      if (audioStream.current) {
        audioStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    onRecordingChange(isRecording, recordingTime);
  }, [isRecording, recordingTime, onRecordingChange]);

  const startTimer = () => {
    timerInterval.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= MAX_RECORDING_TIME - 1) {
          stopRecording();
          return prev;
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = () => {};

      mediaRecorder.current.onstart = () => {
        setIsRecording(true);
        setIsPaused(false);
        startTimer();
      };

      mediaRecorder.current.onstop = () => {
        if (recordingTime < MIN_RECORDING_TIME) {
          setShowMinTimeError(true);
          return;
        }
        if (audioStream.current) {
          audioStream.current.getTracks().forEach(track => track.stop());
        }
        onRecordingComplete();
      };

      mediaRecorder.current.start();
    } catch (err) {
      setShowPermissionError(true);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.pause();
      stopTimer();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current && isPaused) {
      mediaRecorder.current.resume();
      startTimer();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      if (recordingTime < MIN_RECORDING_TIME) {  // Changed from <= to <
        setShowMinTimeError(true);
        return;
      }
      mediaRecorder.current.stop();
      stopTimer();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartOrResume = () => {
    if (!isRecording || isPaused) {
      if (isPaused) {
        resumeRecording();
      } else {
        startRecording();
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="glass-panel p-8 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-center space-x-6">
          {!isRecording || isPaused ? (
            <button
              onClick={handleStartOrResume}
              disabled={disabled || isAnimating}
              className={`p-4 rounded-full transition-colors ${
                disabled || isAnimating 
                  ? 'bg-white/10 opacity-50' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              title={isPaused ? "Resume recording" : "Start recording"}
            >
              {isPaused ? (
                <Play className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>
          ) : (
            <>
              <button
                onClick={pauseRecording}
                className="p-4 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"
                title="Pause recording"
              >
                <Pause className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={stopRecording}
                className="p-4 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                title="Stop recording"
              >
                <Square className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>
        
        <div className="text-center mt-4">
          <div className="text-xl font-medium text-white">
            {formatTime(recordingTime)}/5:00
          </div>
          <p className="text-white/60 text-sm mt-2">
            {!isRecording && !isPaused && recordingTime === 0 && (
              "Click to start recording (minimum 30 seconds)"
            )}
            {isRecording && !isPaused && recordingTime < MIN_RECORDING_TIME && (
              "Recording... (minimum 30 seconds)"
            )}
            {isRecording && !isPaused && recordingTime >= MIN_RECORDING_TIME && (
              "Recording..."
            )}
            {isPaused && (
              "Recording paused"
            )}
          </p>
        </div>
      </div>

      <AlertDialog open={showMinTimeError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Minimum Recording Time</AlertDialogTitle>
            <AlertDialogDescription>
              Please record for at least 30 seconds before stopping. 
              You can continue recording from where you left off.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowMinTimeError(false)}>
              Continue Recording
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                <li>Your voice exists only in your device's temporary memory</li>
                <li>Nothing is ever saved or sent anywhere</li>
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
    </div>
  );
};

export default AudioRecorder;