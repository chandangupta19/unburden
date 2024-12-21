import React, { useState, useEffect, useRef } from 'react';
import { Shield, Check, WifiOff, Mic, Type } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from './components/ui/alert-dialog';
import { Link, useNavigate } from 'react-router-dom';
import AudioRecorder from './components/AudioRecorder';

const MAX_CHARACTERS = 5000;
const MIN_SLIDE_THRESHOLD = 90;
const MAX_ATTEMPTS = 5;
const COOLDOWN_TIME = 60000; // 1 minute in milliseconds
const MIN_WORDS = 20;

interface ParticleStyles extends React.CSSProperties {
  '--tx'?: string;
  '--ty'?: string;
  '--duration'?: string;
}
const NavigationWarning: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, onConfirm, onCancel }) => (
  <AlertDialog open={isOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Unsaved Thoughts</AlertDialogTitle>
        <AlertDialogDescription>
          Your thoughts haven't been released yet. They will be lost if you leave this page. Are you sure?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={onCancel}>Stay</AlertDialogAction>
        <AlertDialogAction onClick={onConfirm}>Leave Page</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const OnlineCheck: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <WifiOff className="text-white" />
            Internet Required
          </AlertDialogTitle>
          <AlertDialogDescription>
            Internet connection is required to use UnburdenHQ.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Particle: React.FC<{ 
  style: ParticleStyles;
  position: { x: number; y: number };
}> = ({ style, position }) => (
  <div
    className="particle"
    style={{
      ...style,
      left: position.x + 'px',
      top: position.y + 'px',
      '--tx': Math.random() * 200 - 100 + 'px',
      '--ty': -Math.random() * 200 - 100 + 'px',
      '--duration': 0.8 + Math.random() * 0.5 + 's'
    } as React.CSSProperties}
  />
);

const SuccessMessage: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="glass-panel px-8 py-4 rounded-lg animate-poof text-xl font-semibold">
      Poof... gone
    </div>
  </div>
);
const Terms: React.FC<{
  isOpen: boolean;
  onAccept: () => void;
}> = ({ isOpen, onAccept }) => (
  <AlertDialog open={isOpen}>
    <AlertDialogContent className="max-h-[90vh] overflow-y-auto">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2">
          <Shield className="text-white" />
          Terms & Conditions
        </AlertDialogTitle>
        <AlertDialogDescription>
          <div className="space-y-4 text-left">
            <p className="text-white/80">
              Welcome to UnburdenHQ. For complete transparency, please understand:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>You must be at least 18 years old. Or, you must meet the minimum age required by your location or any other applicable laws governing you, which may exceed 18 years</li>
              <li>This is not a substitute for professional mental health services</li>
              <li>Your thoughts, written or spoken, exist only in your device's temporary memory</li>
              <li>Nothing is stored permanently - Everything is discarded when released</li>
              <li>You accept our <Link to="/terms" className="text-white underline hover:text-white/80">Terms & Conditions</Link> and <Link to="/privacy" className="text-white underline hover:text-white/80">Privacy Policy</Link></li>
            </ul>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={onAccept}>
          <Check className="mr-2" /> I Accept
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const CooldownAlert: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => (
  <AlertDialog open={isOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Taking a Brief Pause</AlertDialogTitle>
        <AlertDialogDescription>
          You've reached the maximum number of releases (5) for now. 
          Please wait 1 minute before releasing more thoughts.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={onClose}>Understand</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
const Unburden: React.FC = () => {
  const navigate = useNavigate();
  const [thought, setThought] = useState<string>('');
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [showTerms, setShowTerms] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [pendingMode, setPendingMode] = useState<'text' | 'voice' | null>(null);
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('voice');
  const [globalAttemptCount, setGlobalAttemptCount] = useState<number>(0);
  const [isInCooldown, setIsInCooldown] = useState<boolean>(false);
  const [showCooldownAlert, setShowCooldownAlert] = useState<boolean>(false);
  const [particles, setParticles] = useState<ParticleStyles[]>([]);
  const [canRelease, setCanRelease] = useState<boolean>(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState<boolean>(false);
  const [currentRecordingTime, setCurrentRecordingTime] = useState<number>(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const remainingAttempts = MAX_ATTEMPTS - globalAttemptCount;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowTerms(true);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(200, textareaRef.current.scrollHeight) + 'px';
    }
  }, [thought]);
  const handleNavigation = (path: string) => {
    if ((inputMode === 'text' && thought.trim()) || 
        (inputMode === 'voice' && (isVoiceRecording || currentRecordingTime > 0))) {
      setPendingPath(path);
      setShowWarning(true);
    } else {
      navigate(path);
    }
  };

  const confirmNavigation = () => {
    if (pendingPath) {
      setShowWarning(false);
      navigate(pendingPath);
      setPendingPath(null);
    } else if (pendingMode) {
      setInputMode(pendingMode);
      setPendingMode(null);
      setShowWarning(false);
      setThought('');
      setCharacterCount(0);
      setSliderValue(0);
      setCanRelease(false);
      setCurrentRecordingTime(0);
    }
  };

  const createParticles = () => {
    const rect = inputMode === 'text' && textareaRef.current 
      ? textareaRef.current.getBoundingClientRect()
      : { left: window.innerWidth / 2 - 150, top: window.innerHeight / 2 - 150, width: 300, height: 300 };
    
    const newParticles: ParticleStyles[] = [];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        width: Math.random() * 4 + 2 + 'px',
        height: Math.random() * 4 + 2 + 'px',
        background: 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.5) + ')',
        left: rect.left + Math.random() * rect.width + 'px',
        top: rect.top + Math.random() * rect.height + 'px'
      });
    }
    
    setParticles(newParticles);
  };

  const handleRelease = () => {
    if ((!thought && inputMode === 'text') || isAnimating || !canRelease) return;
    
    if (isInCooldown) {
      setShowCooldownAlert(true);
      return;
    }

    if (globalAttemptCount >= MAX_ATTEMPTS) {
      setIsInCooldown(true);
      setShowCooldownAlert(true);
      setTimeout(() => {
        setIsInCooldown(false);
        setGlobalAttemptCount(0);
        setShowCooldownAlert(false);
      }, COOLDOWN_TIME);
      return;
    }
    
    setIsAnimating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    createParticles();
    
    requestAnimationFrame(() => {
      setSliderValue(100);
      
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setThought('');
          setCharacterCount(0);
          setIsAnimating(false);
          setSliderValue(0);
          setParticles([]);
          setGlobalAttemptCount(prev => prev + 1);
          setCanRelease(false);
          setCurrentRecordingTime(0);
        }, 1500);
      }, 800);
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSliderValue(value);
    if (value === 100) {
      handleRelease();
    }
  };

  const toggleInputMode = (mode: 'text' | 'voice') => {
    if (mode === inputMode) return;
    
    if ((inputMode === 'text' && thought.trim()) || 
        (inputMode === 'voice' && (isVoiceRecording || currentRecordingTime > 0))) {
      setPendingMode(mode);
      setShowWarning(true);
      return;
    }
    setInputMode(mode);
    setSliderValue(0);
    setCanRelease(false);
    setCurrentRecordingTime(0);
  };

  const handleRecordingChange = (isRecording: boolean, time: number) => {
    setIsVoiceRecording(isRecording);
    setCurrentRecordingTime(time);
  };
  return (
    <div className="min-h-screen grid-pattern relative overflow-hidden">
      <div className="container mx-auto p-4 relative z-10">
        <div className="text-center mb-8 relative">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-2">
            UNBURDEN
          </h1>
          <p className="text-xl text-white/90">Express & Release Your Thoughts, Feel Lighter</p>
        </div>

        <div className="text-center mb-6">
          <div className="attempts-counter">
            {remainingAttempts} {remainingAttempts === 1 ? 'release' : 'releases'} remaining
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => toggleInputMode('voice')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors mode-toggle ${
              inputMode === 'voice' ? 'active' : ''
            }`}
            disabled={isAnimating}
          >
            <Mic size={20} />
            <span>Voice</span>
          </button>
          <button
            onClick={() => toggleInputMode('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors mode-toggle ${
              inputMode === 'text' ? 'active' : ''
            }`}
            disabled={isAnimating}
          >
            <Type size={20} />
            <span>Text</span>
          </button>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <div className="relative">
            {inputMode === 'text' ? (
              <>
                <textarea
                  ref={textareaRef}
                  value={thought}
                  onChange={(e) => {
                    const newText = e.target.value;
                    setThought(newText);
                    setCharacterCount(newText.length);
                    setCanRelease(newText.trim().split(/\s+/).length >= MIN_WORDS);
                  }}
                  className={'w-full p-6 thought-input rounded-lg text-white min-h-[300px] resize-none ' + 
                    (isAnimating ? 'animate-fade-away' : '')}
                  placeholder="Write your thoughts here... (minimum 20 words)"
                  maxLength={MAX_CHARACTERS}
                  disabled={isAnimating}
                />
                <div className="absolute bottom-4 right-4 text-white/60 text-sm">
                  {characterCount}/{MAX_CHARACTERS}
                </div>
              </>
            ) : (
              <div className={isAnimating ? 'animate-fade-away' : ''}>
                <AudioRecorder
                  isAnimating={isAnimating}
                  onRecordingComplete={() => setCanRelease(true)}
                  onRecordingChange={handleRecordingChange}
                  disabled={sliderValue >= MIN_SLIDE_THRESHOLD}
                />
              </div>
            )}
            
            {particles.map((style, index) => (
              <Particle 
                key={index} 
                style={style} 
                position={{ 
                  x: parseInt(style.left as string), 
                  y: parseInt(style.top as string) 
                }} 
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="relative">
              <div 
                className="slider-progress absolute left-0 top-0" 
                style={{ width: sliderValue + '%' }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                className="release-slider w-full"
                disabled={(!canRelease) || isAnimating}
              />
              <div className="text-white/80 mt-2">
                {sliderValue < MIN_SLIDE_THRESHOLD ? 'Slide to Release the thoughts' : 'Let go...'}
              </div>
            </div>
          </div>
        </div>

        <footer className="footer-links">
          <button onClick={() => handleNavigation('/about')} className="footer-link">
            About UnburdenHQ
          </button>
          <button onClick={() => handleNavigation('/privacy')} className="footer-link">
            Privacy Policy
          </button>
          <button onClick={() => handleNavigation('/terms')} className="footer-link">
            Terms & Conditions
          </button>
        </footer>
      </div>

      <OnlineCheck />
      <Terms isOpen={showTerms} onAccept={() => setShowTerms(false)} />
      <NavigationWarning
        isOpen={showWarning}
        onConfirm={confirmNavigation}
        onCancel={() => {
          setShowWarning(false);
          setPendingPath(null);
          setPendingMode(null);
        }}
      />
      {showSuccess && <SuccessMessage />}
      {showCooldownAlert && (
        <CooldownAlert 
          isOpen={true} 
          onClose={() => setShowCooldownAlert(false)} 
        />
      )}
    </div>
  );
};

export default Unburden;