// ... (previous imports stay the same)

// ... (OnlineCheck, TermsAndConditions components stay the same)

// Success Message Component
const SuccessMessage: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="bg-white/90 text-blue-600 px-8 py-4 rounded-lg shadow-lg animate-poof text-xl font-semibold">
      Poof... gone
    </div>
  </div>
);

// ... (other utility components stay the same)

const Unburden: React.FC = () => {
  const [thought, setThought] = useState<string>('');
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [showTerms, setShowTerms] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // ... (online/offline handling stays the same)

  const handleActionClick = () => {
    if (!thought || isAnimating) return;
    
    setIsAnimating(true);

    // Start the crumple animation
    setTimeout(() => {
      // Show bin during crumple animation
      setTimeout(() => {
        setShowSuccess(true);
        // Reset everything after animation
        setTimeout(() => {
          setShowSuccess(false);
          setThought('');
          setCharacterCount(0);
          setIsAnimating(false);
        }, 1500);
      }, 600); // Show success message as paper hits bin
    }, 100); // Slight delay to start animation
  };

  return (
    <>
      {/* ... (previous components stay the same) */}
      
      <Card className="w-full p-6 shadow-lg relative overflow-hidden">
        <div className={`relative ${isAnimating ? 'animate-crumple' : ''}`}>
          <textarea
            value={thought}
            onChange={(e) => {
              setThought(e.target.value);
              setCharacterCount(e.target.value.length);
            }}
            style={{ fontSize: `${fontSize}px` }}
            className="w-full p-4 border rounded-md min-h-[200px] 
              focus:ring-2 focus:ring-blue-200 transition-all duration-300
              text-base resize-none"
            placeholder="Pour your heart out..."
            maxLength={MAX_CHARACTERS}
            disabled={isAnimating}
          />
        </div>
        
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

      {/* ... (rest of the component stays the same) */}
    </>
  );
};

export default Unburden;
