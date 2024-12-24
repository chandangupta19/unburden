import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, AlertCircle } from 'lucide-react';
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
  onRelease: () => void;
  disabled?: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  isAnimating, 
  onRecordingComplete,
  onRecordingChange,
  onRelease,
  disabled = false 
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [showPermissionError, setShowPermissionError] = useState<boolean>(false);
  const [showTimeAlert, setShowTimeAlert] = useState<boolean>(false);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const audioStream = useRef<MediaStream | null>(null);

  const MAX_RECORDING_TIME = 600; // 10 minutes in seconds

  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      if (audioStream.current) {
        audioStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    onRecordingChange(isRecording, recordingTime);
  }, [isRecording, recordingTime, onRecordingChange]);

  useEffect(() => {
    if (isAnimating) {
      // Reset everything on release
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      if (audioStream.current) {
        audioStream.current.getTracks().forEach(track => track.stop());
      }
      setRecordingTime(0);
      setIsRecording(false);
      setIsPaused(false);
      setShowTimeAlert(false);
      mediaRecorder.current = null;
      audioStream.current = null;
    }
  }, [isAnimating]);

  const startTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    timerInterval.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= MAX_RECORDING_TIME - 1) {
          if (isRecording) {
            pauseRecording();
          }
          setShowTimeAlert(true);
          return MAX_RECORDING_TIME;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const startRecording = async () => {
    if (recordingTime >= MAX_RECORDING_TIME) {
      setShowTimeAlert(true);
      return;
    }

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

      mediaRecorder.current.start();
    } catch (err) {
      setShowPermissionError(true);
    }
  };

  const pauseRecording = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    setIsPaused(true);
    setIsRecording(false);
  };

  const resumeRecording = () => {
    if (recordingTime >= MAX_RECORDING_TIME) {
      setShowTimeAlert(true);
      return;
    }
    setIsRecording(true);
    setIsPaused(false);
    startTimer();
  };

  const handleRecordingButton = () => {
    if (!isRecording && !isPaused) {
      // Starting new recording
      setRecordingTime(0);
      startRecording();
    } else if (isRecording) {
      // Pausing recording
      pauseRecording();
    } else if (isPaused) {
      // Resuming recording
      resumeRecording();
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="glass-panel p-8 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={handleRecordingButton}
            disabled={disabled || isAnimating}
            className={`p-4 rounded-full transition-colors ${
              isRecording 
                ? 'bg-red-500/80 hover:bg-red-500' 
                : disabled || isAnimating 
                  ? 'bg-white/10 opacity-50' 
                  : 'bg-white/10 hover:bg-white/20'
            }`}
            title={isRecording ? "Pause recording" : isPaused ? "Resume recording" : "Start recording"}
          >
            {isRecording ? (
              <Square className="w-6 h-6 text-white" />
            ) : isPaused ? (
              <Play className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
        
        <div className="text-center mt-4">
          <div className="text-xl font-medium text-white">
            {formatTime(recordingTime)}/10:00
          </div>
          <p className="text-white/60 text-sm mt-2">
            {!isRecording && !isPaused && recordingTime === 0 && (
              "Click to start recording"
            )}
            {isRecording && (
              "Recording..."
            )}
            {isPaused && (
              "Recording paused"
            )}
          </p>
        </div>
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

      <AlertDialog open={showTimeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="text-white" />
              Maximum Recording Time Reached
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have reached the maximum recording time of 10 minutes. 
              Click below to release your thoughts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setShowTimeAlert(false);
              onRelease();
            }}>
              Release Thoughts
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AudioRecorder;