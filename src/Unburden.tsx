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

interface ParticleStyles extends React.CSSProperties {
  '--tx'?: string;
  '--ty'?: string;
  '--duration'?: string;
}

// [Previous interface definitions remain the same]
// NavigationWarning, OnlineCheck, Particle, SuccessMessage components remain the same

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
              <li>You must be at least 18 years old or meet your location's minimum age requirement</li>
              <li>This is not a substitute for professional mental health services</li>
              <li>Your thoughts (written or spoken) exist only temporarily in your device's memory</li>
              <li>Nothing is ever saved to storage or sent to any servers</li>
              <li>All content is immediately and completely discarded upon release</li>
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
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
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
    if ((!thought && inputMode === 'text') || isAnimating || sliderValue < MIN_SLIDE_THRESHOLD) return;
    
    setIsAnimating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    createParticles();
    
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setThought('');
        setCharacterCount(0);
        setIsAnimating(false);
        setSliderValue(0);
        setParticles([]);
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

  const toggleInputMode = (mode: 'text' | 'voice') => {
    if (thought.trim()) {
      // Show warning if there's unsaved content
      return;
    }
    setInputMode(mode);
    setSliderValue(0);
  };

  return (
    <div className="min-h-screen grid-pattern relative overflow-hidden">
      <div className="container mx-auto p-4 relative z-10">
        <div className="text-center mb-8 relative">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-2">
            UNBURDEN
          </h1>
          <p className="text-xl text-white/90">A Safe Space for Your Thoughts</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => toggleInputMode('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              inputMode === 'text' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'
            }`}
            disabled={isAnimating}
          >
            <Type size={20} />
            <span>Text</span>
          </button>
          <button
            onClick={() => toggleInputMode('voice')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              inputMode === 'voice' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'
            }`}
            disabled={isAnimating}
          >
            <Mic size={20} />
            <span>Voice</span>
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
                    setThought(e.target.value);
                    setCharacterCount(e.target.value.length);
                  }}
                  className={'w-full p-6 thought-input rounded-lg text-white min-h-[300px] resize-none ' + 
                    (isAnimating ? 'animate-fade-away' : '')}
                  placeholder="Write your thoughts here..."
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
                  onRecordingComplete={handleRelease}
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
                disabled={(!thought && inputMode === 'text') || isAnimating}
              />
              <div className="text-white/80 mt-2">
                {sliderValue < MIN_SLIDE_THRESHOLD ? 'Slide to Release' : 'Let go...'}
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
      {showSuccess && <SuccessMessage />}
    </div>
  );
};

export default Unburden;