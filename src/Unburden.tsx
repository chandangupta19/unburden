import React, { useState, useEffect, useRef } from 'react';
import { Shield, Check, WifiOff } from 'lucide-react';
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

const MAX_CHARACTERS = 5000;
const MIN_SLIDE_THRESHOLD = 90;

interface ParticleStyles extends React.CSSProperties {
  '--tx'?: string;
  '--ty'?: string;
  '--duration'?: string;
}

const Bird: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    viewBox="0 0 40 30" 
    className={'w-8 h-8 ' + className}
    fill="currentColor"
  >
    <path 
      d="M15,15 Q20,10 25,15 L30,12 Q35,10 38,15 L35,18 Q32,20 28,18 L25,17 Q20,22 15,17 Z"
    />
    <path 
      d="M20,15 Q25,10 30,15 Q25,18 20,15"
    />
    <circle cx="33" cy="14" r="2"/>
  </svg>
);

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
            Internet Connection Required
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-4">
              First-time access to UnburdenHQ requires an internet connection to verify and accept the latest terms and conditions.
            </p>
            <p>Please connect to the internet and refresh the page.</p>
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
              By using UnburdenHQ, you confirm:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>You are at least 18 years old</li>
              <li>You must meet the minimum age required by your location</li>
              <li>This is not a substitute for professional mental health services</li>
              <li>All content is private and immediately deleted upon release</li>
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
  const [birdState, setBirdState] = useState<'idle' | 'takeoff' | 'return'>('idle');
  const [particles, setParticles] = useState<ParticleStyles[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    if (thought.trim()) {
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
    }
  };

  const createParticles = () => {
    if (!textareaRef.current) return;
    
    const rect = textareaRef.current.getBoundingClientRect();
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
    if (!thought || isAnimating || sliderValue < MIN_SLIDE_THRESHOLD) return;
    
    setIsAnimating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setBirdState('takeoff');
    createParticles();
    
    setTimeout(() => {
      setShowSuccess(true);
      setBirdState('return');
      setTimeout(() => {
        setShowSuccess(false);
        setThought('');
        setCharacterCount(0);
        setIsAnimating(false);
        setSliderValue(0);
        setParticles([]);
        setBirdState('idle');
      }, 1500);
    }, 800);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSliderValue(value);
    if (value >= MIN_SLIDE_THRESHOLD) {
      handleRelease();
    }
  };

  return (
    <div className="min-h-screen grid-pattern relative overflow-hidden">
      <div className="container mx-auto p-4 relative z-10">
        <div className="text-center mb-8 relative">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-2">
            UNBURDEN
            <Bird className={'absolute -right-8 top-0 text-white bird-' + birdState} />
          </h1>
          <p className="text-xl text-white/90">A Safe Space for Your Thoughts</p>
        </div>

        <div className="max-w-3xl mx-auto mt-16">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={thought}
              onChange={(e) => {
                setThought(e.target.value);
                setCharacterCount(e.target.value.length);
              }}
              className={'w-full p-6 thought-input rounded-lg text-white min-h-[300px] resize-none ' + 
                (isAnimating ? 'animate-fade-away' : '')}
              placeholder="Write your thoughts here..."
              maxLength={MAX_CHARACTERS}
              disabled={isAnimating}
            />
            
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
            
            <div className="absolute bottom-4 right-4 text-white/60 text-sm">
              {characterCount}/{MAX_CHARACTERS}
            </div>
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
                disabled={!thought || isAnimating}
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
        }}
      />
      {showSuccess && 