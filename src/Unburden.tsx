import React, { useState } from 'react';
import { Card } from './components/ui/card';
import { Shield, Check, Trash2, Lock, Cloud, Heart } from 'lucide-react';
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
const STORAGE_KEY = 'unburden-terms-accepted';
const ACCEPTANCE_EXPIRY = 180 * 24 * 60 * 60 * 1000;

// Terms component remains the same

const Unburden: React.FC = () => {
  const [thought, setThought] = useState<string>('');
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Previous handlers remain the same

  const handleActionClick = () => {
    if (!thought) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setThought('');
      setCharacterCount(0);
      setIsAnimating(false);
    }, 1500); // Match this with animation duration
  };

  return (
    <>
      <TermsAndConditions isOpen={showTerms} onAccept={handleTermsAccept} />
      <div className="container mx-auto p-4 max-w-xl min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Unburden</h1>
          <p className="text-xl text-blue-500">Release your thoughts into the digital void.</p>
        </div>

        <div className="flex justify-between w-full mb-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Lock className="text-blue-500" size={24} />
            </div>
            <span className="text-sm text-blue-600">Secure & Private</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <Cloud className="text-purple-500" size={24} />
            </div>
            <span className="text-sm text-purple-600">Nothing Stored</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-2">
              <Heart className="text-pink-500" size={24} />
            </div>
            <span className="text-sm text-pink-600">Feel Lighter</span>
          </div>
        </div>

        <Card className="w-full p-6 shadow-lg relative overflow-hidden">
          <textarea
            value={thought}
            onChange={(e) => {
              setThought(e.target.value);
              setCharacterCount(e.target.value.length);
            }}
            className={`w-full p-4 border rounded-md min-h-[200px] 
              focus:ring-2 focus:ring-blue-200 transition-all duration-300
              text-base resize-none ${isAnimating ? 'animate-float-away' : ''}`}
            placeholder="Pour your heart out..."
            maxLength={MAX_CHARACTERS}
            disabled={isAnimating}
          />
          
          <div className="absolute bottom-4 right-4 text-sm text-gray-500">
            {characterCount}/{MAX_CHARACTERS}
          </div>

          {isAnimating && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center animate-fade-in">
                <Trash2 className="text-gray-400" size={32} />
              </div>
            </div>
          )}
        </Card>

        <button
          onClick={handleActionClick}
          disabled={!thought || isAnimating}
          className={`mt-6 px-8 py-3 rounded-full text-white font-medium
            transition-all duration-300 transform hover:scale-105
            ${thought && !isAnimating ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'}
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isAnimating ? 'animate-button-press' : ''}`}
        >
          Release Thoughts
        </button>

        <p className="text-gray-500 text-sm mt-4">
          Press Enter or click the button to release your thoughts
        </p>
      </div>

      <style jsx>{`
        @keyframes floatAway {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(20px) scale(0.9);
            opacity: 0.5;
          }
          100% {
            transform: translateY(40px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes buttonPress {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }

        .animate-float-away {
          animation: floatAway 1.5s ease-in-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-button-press {
          animation: buttonPress 1.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Unburden;
