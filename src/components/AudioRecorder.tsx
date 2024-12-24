import React, { useState, useRef, useEffect, useCallback } from 'react';

// ... (previous imports remain same)

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

  const MAX_RECORDING_TIME = 300;

  // Move resetRecording to useCallback
  const resetRecording = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
    pausedTime.current = 0;
    if (audioStream.current) {
      audioStream.current.getTracks().forEach(track => track.stop());
      audioStream.current = null;
    }
    mediaRecorder.current = null;
  }, []);

  // Rest of the functions remain same until the useEffects

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
    const hasContent = recordingTime > 0;
    onRecordingChange(isRecording, hasContent ? recordingTime : 0);
  }, [isRecording, recordingTime, onRecordingChange]);

  // Add resetRecording to dependencies
  useEffect(() => {
    if (isAnimating) {
      resetRecording();
    }
  }, [isAnimating, resetRecording]);

  // Rest of the component remains same
}

export default AudioRecorder;