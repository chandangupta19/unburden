```typescript
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
import { Link } from 'react-router-dom';

const MAX_CHARACTERS = 5000;
const MIN_SLIDE_THRESHOLD = 90;

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

const ThoughtBubble: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="thought-bubble animate-float" style={style} />
);

const SuccessMessage: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="bg-white/90 text-blue-600 px-8 py-4 rounded-lg animate-poof text-xl font-semibold">
      Thoughts released...
    </div>
  </div>
);

const TermsAndConditions: React.FC<{
  isOpen: boolean;
  onAccept: () => void;
}> = ({ isOpen, onAccept }) => (
  <AlertDialog open={isOpen}>
    <AlertDialogContent className="max-h-[90vh] overflow-y-auto">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2">
          <Shield className="text-blue-500" />
          Terms & Conditions
        </AlertDialogTitle>
        <AlertDialogDescription>
          <div className="space-y-4 text-left">
            <p className="text-sm">
              By using UnburdenHQ, you confirm:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>You are at least 18 years old</li>
              <li>You must meet the minimum age required by your location or any other applicable laws governing you, which may exceed 18 years</li>
              <li>This is not a substitute for professional mental health services</li>
              <li>All your content is private and will be immediately deleted upon release</li>
              <li>You accept our <Link to="/terms" className="text-blue-500 underline hover:text-blue-600">Terms & Conditions</Link> and <Link to="/privacy" className="text-blue-500 underline hover:text-blue-600">Privacy Policy</Link></li>
            </ul>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction 
          onClick={onAccept}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Check className="mr-2" /> I Accept
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const Unburden: React.FC = () => {
  const [thought, setThought] = useState<string>('');
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [showTerms, setShowTerms] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [thoughtBubbles, setThoughtBubbles] = useState<React.CSSProperties[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(200, textareaRef.current.scrollHeight) + 'px';
    }
  }, [thought]);

  const handleTermsAccept = () => {
    if (!isOnline) return;
    setShowTerms(false);
  };

  const createThoughtBubbles = () => {
    const bubbles: React.CSSProperties[] = [];
    for (let i = 0; i < 8; i++) {
      bubbles.push({
        width: (Math.random() * 15 + 5) + 'px',
        height: (Math.random() * 15 + 5) + 'px',
        left: (Math.random() * 80 + 10) + '%',
        top: '100%',
        opacity: Math.random() * 0.5 + 0.5,
        animationDelay: Math.random() * 0.5 + 's'
      });
    }
    setThoughtBubbles(bubbles);
  };

  const handleRelease = () => {
    if (!thought || isAnimating || sliderValue < MIN_SLIDE_THRESHOLD) return;
    
    setIsAnimating(true);
    createThoughtBubbles();
    
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setThought('');
        setCharacterCount(0);
        setIsAnimating(false);
        setSliderValue(0);
        setThoughtBubbles([]);
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
    <div className="min-h-screen bg-gradient-to-br from-[#FF3CAC] via-[#784BA0] to-[#2B86C5]">
      <div className="container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Unburden</h1>
          <p className="text-xl text-white/90">Release Your Emotions, Your Way</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <textarea
            ref={textareaRef}
            value={thought}
            onChange={(e) => {
              setThought(e.target.value);
              setCharacterCount(e.target.value.length);
            }}
            className={'w-full p-6 thought-input rounded-lg text-white min-h-[200px] resize-none ' + 
  (isAnimating ? 'animate-fade-away' : '')}
            placeholder="Pour your heart out..."
            maxLength={MAX_CHARACTERS}
            disabled={isAnimating}
          />
          
          {thoughtBubbles.map((style, index) => (
            <ThoughtBubble key={index} style={style} />
          ))}
          
          <div className="absolute bottom-4 right-4 text-white/60 text-sm">
            {characterCount}/{MAX_CHARACTERS}
          </div>
        </div>

        <div className="text-center mt-8 max-w-3xl mx-auto">
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
              {sliderValue < MIN_SLIDE_THRESHOLD ? 'Slide to Release →' : 'Let go...'}
            </div>
          </div>
        </div>

        <footer className="footer-links">
          <Link to="/about" className="footer-link">About UnburdenHQ</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms & Conditions</Link>
        </footer>
      </div>

      <OnlineCheck />
      <TermsAndConditions isOpen={showTerms} onAccept={handleTermsAccept} />
      {showSuccess && <SuccessMessage />}
    </div>
  );
};

export default Unburden;
```
