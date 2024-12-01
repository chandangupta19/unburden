import React, { useState, useEffect } from 'react';
import { Card } from './components/ui/card';
import { Info, Shield, Check } from 'lucide-react';
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
const ACCEPTANCE_EXPIRY = 180 * 24 * 60 * 60 * 1000; // 180 days in milliseconds

const TermsAndConditions: React.FC<{
  isOpen: boolean;
  onAccept: () => void;
}> = ({ isOpen, onAccept }) => (
  <AlertDialog open={isOpen}>
    <AlertDialogContent className="max-h-[90vh] overflow-y-auto">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2">
          <Shield className="text-green-500" />
          Terms & Conditions
        </AlertDialogTitle>
        <AlertDialogDescription>
          <div className="space-y-4 text-left">
            <h3 className="font-bold text-lg">Privacy Policy</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>No data is stored or tracked</li>
              <li>Your thoughts are completely private</li>
              <li>Content is deleted immediately after use</li>
            </ul>

            <h3 className="font-bold text-lg mt-4">Usage Guidelines</h3>
            <p className="text-sm">
              This is a safe space to express your emotions. 
              Use it responsibly and respectfully.
            </p>

            <div className="bg-blue-50 p-3 rounded-md mt-4">
              <p className="font-semibold">
                Important: This is not a substitute for professional mental health support.
              </p>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction 
          onClick={onAccept}
          className="bg-green-500 hover:bg-green-600"
        >
          <Check className="mr-2" /> I Understand and Accept
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const Unburden: React.FC = () => {
  const [thought, setThought] = useState<string>('');
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [showTerms, setShowTerms] = useState<boolean>(false);

  // Check Terms Acceptance on Component Mount
  useEffect(() => {
    const termsData = localStorage.getItem(STORAGE_KEY);
    if (termsData) {
      const { timestamp } = JSON.parse(termsData);
      // Check if terms were accepted more than 180 days ago
      if (Date.now() - timestamp > ACCEPTANCE_EXPIRY) {
        setShowTerms(true);
      }
    } else {
      setShowTerms(true);
    }
  }, []);

  // Handle Terms Acceptance
  const handleTermsAccept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      timestamp: Date.now()
    }));
    setShowTerms(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setThought(value);
    setCharacterCount(value.length);
  };

  const handleActionClick = () => {
    // Clear thought and reset related states
    setThought('');
    setCharacterCount(0);
  };

  return (
    <>
      <TermsAndConditions 
        isOpen={showTerms}
        onAccept={handleTermsAccept}
      />
      <div className="container mx-auto p-4 max-w-xl">
        <Card className="p-4 sm:p-6 shadow-lg">
          <div className="relative">
            <textarea
              value={thought}
              onChange={handleInputChange}
              className="w-full p-3 sm:p-4 border rounded-md min-h-[200px] 
                focus:ring-2 focus:ring-blue-200 transition-all duration-300
                text-sm sm:text-base"
              placeholder="This is a safe space. Share your thoughts freely..."
              maxLength={MAX_CHARACTERS}
            />
            <div className="absolute bottom-2 right-4 text-xs sm:text-sm text-gray-500">
              {characterCount}/{MAX_CHARACTERS}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleActionClick}
              className="bg-red-500 text-white px-4 py-2 rounded-md 
                hover:bg-red-600 transition-colors 
                text-sm sm:text-base"
            >
              Release Emotions
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Unburden;
