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

// Decorative circle component
const FloatingCircle = ({ size, delay = 0, className = '' }: { size: number; delay?: number; className?: string }) => (
  <div 
    className={`circle-decoration animate-float ${className}`}
    style={{
      width: size,
      height: size,
      animationDelay: `${delay}s`,
      background: 'rgba(255, 255, 255, 0.5)'
    }}
  />
);

// Circular background element
const CircularDecoration = ({ size, opacity = 0.1, className = '' }: { size: number; opacity?: number; className?: string }) => (
  <div 
    className={`circle-decoration ${className}`}
    style={{
      width: size,
      height: size,
      border: `2px solid rgba(255, 255, 255, ${opacity})`
    }}
  />
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

const TermsAndConditions: React.FC<{
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
              <li>You must meet the minimum age required by your location or any other applicable laws governing you, which may exceed 18 years</li>
              <li>This is not a substitute for professional mental health services</li>
              <li>You accept our <Link to="/terms" className="text-white hover:text-white/80">Terms & Conditions</Link> and <Link to="/privacy" className="text-white hover:text-white/80">Privacy Policy</Link></li>
            </ul>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction 
          onClick={onAccept}
          className="modern-button"
        >
          <Check className="mr-2" /> I Accept
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const SuccessMessage: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="glass-panel px-8 py-4 rounded-lg animate-poof text-xl font-semibold neon-text">
      Poof... gone
    </div>
  </div>
);

const Unburden: React.FC = () => {
  const [thought, setThought] = useState<string>('');
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [showTerms, setShowTerms] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(200, textareaRef.current.scrollHeight)}px`;
    }
  }, [thought]);

  const handleTermsAccept = () => {
    if (!isOnline) return;
    setShowTerms(false);
  };

  const handleRelease = () => {
    if (!thought || isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setThought('');
        setCharacterCount(0);
        setIsAnimating(false);
      }, 1500);
    }, 800);
  };

  return (
    <div className="min-h-screen grid-pattern relative overflow-hidden">
      {/* Decorative Elements */}
      <CircularDecoration size={500} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <CircularDecoration size={400} opacity={0.15} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <CircularDecoration size={300} opacity={0.2} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      {/* Floating Circles */}
      <FloatingCircle size={10} className="absolute top-[20%] right-[30%]" />
      <FloatingCircle size={6} delay={1} className="absolute top-[40%] left-[20%]" />
      <FloatingCircle size={8} delay={2} className="absolute top-[60%] right-[20%]" />
      <FloatingCircle size={4} delay={3} className="absolute top-[30%] left-[30%]" />

      <div className="container mx-auto p-4 relative z-10">
        {/* Title Section */}
        <h1 className="text-6xl md:text-7xl font-black text-center mt-12 mb-8 neon-text">
          UNBURDEN
        </h1>
        
        {/* Main Content Area */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={thought}
              onChange={(e) => {
                setThought(e.target.value);
                setCharacterCount(e.target.value.length);
              }}
              className={`w-full p-6 modern-textarea rounded-lg min-h-[300px]
                ${isAnimating ? 'animate-fade-away' : ''}`}
              placeholder="Release your thoughts here..."
              maxLength={MAX_CHARACTERS}
              disabled={isAnimating}
            />
            
            <div className="absolute bottom-4 right-4 text-white/60 text-sm">
              {characterCount}/{MAX_CHARACTERS}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleRelease}
              disabled={!thought || isAnimating}
              className={`modern-button px-12 py-4 rounded-lg font-bold text-xl
                ${!thought || isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
            >
              Release Thoughts
            </button>
          </div>
        </div>

        <footer className="footer-links mt-auto">
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
