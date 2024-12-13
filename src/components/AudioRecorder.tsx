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
  const [finalRecordingTime, setFinalRecordingTime] = useState<string>('');
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const MAX_RECORDING_TIME = 300; // 5 minutes in seconds
  const MIN_RECORDING_TIME = 30; // 30 seconds minimum

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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = () => {};

      mediaRecorder.current.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        if (recordingTime >= MIN_RECORDING_TIME) {
          onRecordingComplete();
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      setFinalRecordingTime('');
      startTimer();
    } catch (err) {
      setShowPermissionError(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      if (recordingTime < MIN_RECORDING_TIME) {
        setShowPermissionError(true);
        return;
      }
      
      setFinalRecordingTime(formatTime(recordingTime));
      mediaRecorder.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  };

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

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={disabled || isAnimating}
            className={`p-4 rounded-full transition-colors ${
              disabled || isAnimating 
                ? 'bg-white/10 opacity-50' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
            title="Start speaking"
          >
            <Mic className="w-6 h-6 text-white" />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="p-4 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors recording-pulse"
            title="Stop speaking"
          >
            <Square className="w-6 h-6 text-white" />
          </button>
        )}
        <div className="text-white/80 min-w-[60px]">
          {isRecording ? formatTime(recordingTime) : finalRecordingTime || '0:00'}
        </div>
      </div>

      <p className="text-white/60 text-sm text-center">
        {isRecording 
          ? `Speaking... (minimum ${MIN_RECORDING_TIME} seconds)` 
          : "Click to start speaking and share your thoughts"}
      </p>

      <AlertDialog open={showPermissionError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="text-white" />
              {recordingTime < MIN_RECORDING_TIME && recordingTime > 0
                ? "Minimum Recording Time"
                : "Microphone Access Required"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {recordingTime < MIN_RECORDING_TIME && recordingTime > 0 ? (
                <p className="mb-4">
                  Please speak for at least {MIN_RECORDING_TIME} seconds before releasing your thoughts.
                </p>
              ) : (
                <>
                  <p className="mb-4">
                    Please allow microphone access to use the voice feature.
                  </p>
                  <p className="mb-4">
                    For your privacy:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your voice exists only momentarily in your device's temporary memory</li>
                    <li>Nothing is ever saved or sent anywhere</li>
                    <li>Everything is discarded instantly</li>
                  </ul>
                </>
              )}
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