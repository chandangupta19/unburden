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

const DiagonalElement = ({ className = '' }: { className?: string }) => (
  <div className={`diagonal-element bg-accent h-20 ${className}`} />
);

const CornerAccent = ({ className = '' }: { className?: string }) => (
  <div className={`w-10 h-10 border-l-2 border-t-2 border-primary ${className}`} />
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
            <WifiOff className="text-primary" />
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
          <Shield className="text-primary" />
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
              <li>You accept our <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction 
          onClick={onAccept}
          className="brutalist-button text-white hover:border-primary"
        >
          <Check className="mr-2" /> I Accept
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const SuccessMessage: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="bg-bg-dark text-primary px-8 py-4 rounded animate-poof text-xl font-bold">
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
    <div className="min-h-screen grid-pattern">
      <DiagonalElement className="absolute top-0 left-0" />
      <DiagonalElement className="absolute top-0 right-0 transform -scale-x-100" />

      <div className="container mx-auto p-4 relative z-10">
        <div className="mb-16 mt-8">
          <h1 className="text-[120px] font-black text-white leading-none tracking-tight mb-4">
            UN<br />BURDEN
          </h1>
          <div className="h-1 w-40 bg-primary animate-line" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <CornerAccent className="absolute -top-2 -left-2 animate-corner" />
          <CornerAccent className="absolute -top-2 -right-2 transform scale-x-[-1] animate-corner" />
          <CornerAccent className="absolute -bottom-2 -left-2 transform scale-y-[-1] animate-corner" />
          <CornerAccent className="absolute -bottom-2 -right-2 transform scale-[-1] animate-corner" />

          <textarea
            ref={textareaRef}
            value={thought}
            onChange={(e) => {
              setThought(e.target.value);
              setCharacterCount(e.target.value.length);
            }}
            className={`w-full p-6 brutalist-textarea text-white min-h-[200px]
              ${isAnimating ? 'animate-fade-away' : ''}`}
            placeholder="Pour your heart out..."
            maxLength={MAX_CHARACTERS}
            disabled={isAnimating}
          />
          
          <div className="absolute bottom-4 right-4 text-text-light text-sm">
            {characterCount}/{MAX_CHARACTERS}
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleRelease}
            disabled={!thought || isAnimating}
            className={`brutalist-button px-12 py-4 text-white font-bold text-xl
              ${thought && !isAnimating ? 'hover:border-primary' : 'opacity-50 cursor-not-allowed'}`}
          >
            Release Thoughts
          </button>
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
