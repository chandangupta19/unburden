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
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const audioStream = useRef<MediaStream | null>(null);
  const pausedTime = useRef<number>(0);

  const MAX_RECORDING_TIME = 300; // 5 minutes in seconds

  // Reset everything
  const resetRecording = () => {
    stopTimer();
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
    pausedTime.current = 0;
    if (audioStream.current) {
      audioStream.current.getTracks().forEach(track => track.stop());
      audioStream.current = null;
    }
    mediaRecorder.current = null;
  };

  function stopTimer() {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }

  function startTimer() {
    stopTimer(); // Clear any existing timer
    timerInterval.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= MAX_RECORDING_TIME - 1) {
          pauseRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      stopTimer();
      if (audioStream.current) {
        audioStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Only consider recording active if we have actual recorded content
    const hasContent = recordingTime > 0;
    onRecordingChange(isRecording, hasContent ? recordingTime : 0);
  }, [isRecording, recordingTime, onRecordingChange]);

  // Reset when animation starts (release action)
  useEffect(() => {
    if (isAnimating) {
      resetRecording();
    }
  }, [isAnimating]);

  async function startRecording() {
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
        if (!isPaused) {
          resetRecording();
          onRecordingComplete();
        }
      };

      mediaRecorder.current.start();
    } catch (err) {
      setShowPermissionError(true);
    }
  }

  function pauseRecording() {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      pausedTime.current = recordingTime;
      stopTimer();
      setIsPaused(true);
      setIsRecording(false);
    }
  }

  async function resumeRecording() {
    if (!audioStream.current) {
      // If stream was lost, get a new one
      try {
        audioStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        setShowPermissionError(true);
        return;
      }
    }

    mediaRecorder.current = new MediaRecorder(audioStream.current);
    mediaRecorder.current.ondataavailable = () => {};
    
    mediaRecorder.current.onstart = () => {
      setIsRecording(true);
      setIsPaused(false);
      startTimer();
    };

    mediaRecorder.current.onstop = () => {
      if (!isPaused) {
        resetRecording();
        onRecordingComplete();
      }
    };

    mediaRecorder.current.start();
  }

  function handleRecordingButton() {
    if (!isRecording && !isPaused) {
      // Start new recording
      setRecordingTime(0);
      pausedTime.current = 0;
      startRecording();
    } else if (isRecording) {
      // Pause current recording
      pauseRecording();
    } else if (isPaused) {
      // Resume paused recording
      resumeRecording();
    }
  }

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

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
            {formatTime(recordingTime)}/5:00
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
    </div>
  );
};

export default AudioRecorder;