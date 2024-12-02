import React, { useState, useEffect, useRef } from 'react';
import { Card } from './components/ui/card';
import { Shield, Check, Trash2, Lock, Cloud, Heart, WifiOff, Settings } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from './components/ui/alert-dialog';

const MAX_CHARACTERS = 5000;

// Online Check Component
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
            <WifiOff className="text-red-500" />
            Internet Connection Required
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-4">
              First-time access to Unburden requires an internet connection to verify and accept the latest terms and conditions.
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
      {/* Terms content remains the same */}
    </AlertDialogContent>
  </AlertDialog>
);

const SuccessMessage: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="bg-white/90 text-blue-600 px-8 py-4 rounded-lg shadow-lg animate-poof text-xl font-semibold">
      Poof... gone
    </div>
  </div>
);

const TopIllustration: React.FC = () => (
  <svg 
    viewBox="0 0 400 100" 
    className="w-full h-32 mb-8 text-blue-100"
  >
    <path
      d="M0,50 Q100,20 200,50 T400,50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="300" cy="30" r="15" fill="currentColor" opacity="0.5" />
    <circle cx="150" cy="40" r="10" fill="currentColor" opacity="0.3" />
    <circle cx="50" cy="60" r="8" fill="currentColor" opacity="0.4" />
  </svg>
);

const MindAnimation: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  if (!isAnimating) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className={`w-32 h-32 mx-auto ${isAnimating ? 'animate-mind-open' : ''}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M20,80 Q50,20 80,80" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-blue-500"
          />
        </svg>
      </div>
    </div>
  );
};

// Font Size Slider Component
const FontSizeSlider: React.FC<{
  fontSize: number;
  onChange: (size: number) => void;
}> = ({ fontSize, onChange }) => (
  <div className="px-4 py-2 bg-white rounded-lg shadow-sm flex items-center gap-3 w-full">
    <Settings size={16} className="text-gray-400" />
    <input
      type="range"
      min="14"
      max="24"
      value={fontSize}
      onChange={(e) => onChange(Number(e.target.value))}
      className="font-slider flex-1"
    />
    <span className="text-sm text-gray-500 min-w-[3ch]">{fontSize}px</span>
  </div>
);

// Main Component
const Unburden: React.FC = () => {
  const [thought, setThought] = useState<string>('');
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [showTerms, setShowTerms] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      window.location.reload();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '200px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [thought]);

  const handleTermsAccept = () => {
    if (!isOnline) return;
    setShowTerms(false);
  };

  const handleActionClick = () => {
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
    }, 1200);
  };

  return (
    <>
      <OnlineCheck />
      <TermsAndConditions 
        isOpen={showTerms}
        onAccept={handleTermsAccept}
      />
      {showSuccess && <SuccessMessage />}
      <div className="container mx-auto p-4 max-w-xl min-h-screen flex flex-col items-center justify-center">
        <TopIllustration />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Unburden</h1>
          <p className="text-xl text-blue-500">Release your thoughts into the digital void.</p>
        </div>

        <div className="flex justify-between w-full mb-8 flex-wrap gap-4 sm:flex-nowrap">
          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 transition-transform hover:scale-105">
              <Lock className="text-blue-500" size={24} />
            </div>
            <span className="text-sm text-blue-600">Secure & Private</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 transition-transform hover:scale-105">
              <Cloud className="text-purple-500" size={24} />
            </div>
            <span className="text-sm text-purple-600">Nothing Stored</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-2 transition-transform hover:scale-105">
              <Heart className="text-pink-500" size={24} />
            </div>
            <span className="text-sm text-pink-600">Feel Lighter</span>
          </div>
        </div>

        <Card className="w-full p-6 shadow-lg relative overflow-hidden">
          <MindAnimation isAnimating={isAnimating} />
          <textarea
            ref={textareaRef}
            value={thought}
            onChange={(e) => {
              setThought(e.target.value);
              setCharacterCount(e.target.value.length);
            }}
            style={{ fontSize: `${fontSize}px` }}
            className={`w-full p-4 border rounded-md min-h-[200px]
              focus:ring-2 focus:ring-blue-200 transition-all duration-300
              text-base resize-none bg-transparent
              ${isAnimating ? 'animate-thought-float' : ''}`}
            placeholder="Pour your heart out..."
            maxLength={MAX_CHARACTERS}
            disabled={isAnimating}
          />
          
          <div className="absolute bottom-4 right-4 bg-white text-sm text-gray-500 px-3 py-1 rounded-full shadow-sm">
            {characterCount}/{MAX_CHARACTERS}
          </div>

          {isAnimating && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center animate-bin-appear">
                <Trash2 className="text-gray-400" size={32} />
              </div>
            </div>
          )}
        </Card>

        <div className="w-full mt-4 mb-6">
          <FontSizeSlider fontSize={fontSize} onChange={setFontSize} />
        </div>

        <button
          onClick={handleActionClick}
          disabled={!thought || isAnimating}
          className={`px-8 py-3 rounded-full text-white font-medium
            transition-all duration-300 transform hover:scale-105
            ${thought && !isAnimating ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'}
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Release Thoughts
        </button>

        <p className="text-gray-500 text-sm mt-4">
          Click the button to release your thoughts
        </p>
      </div>
    </>
  );
};

export default Unburden;
