// ... (previous imports remain the same)

const TextArea: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fontSize: number;
  isAnimating: boolean;
  disabled: boolean;
}> = ({ value, onChange, fontSize, isAnimating, disabled }) => (
  <div className={`relative ${isAnimating ? 'animate-crumple' : ''}`}>
    <div className="absolute inset-0 paper-texture crease-overlay"></div>
    <textarea
      value={value}
      onChange={onChange}
      style={{ fontSize: `${fontSize}px` }}
      className="w-full p-4 border rounded-md min-h-[200px] 
        focus:ring-2 focus:ring-blue-200 transition-all duration-300
        text-base resize-none relative z-10 bg-transparent"
      placeholder="Pour your heart out..."
      maxLength={5000}
      disabled={disabled}
    />
  </div>
);

// ... (other components remain the same)

const Unburden: React.FC = () => {
  // ... (previous state declarations remain the same)

  const handleActionClick = () => {
    if (!thought || isAnimating) return;
    
    setIsAnimating(true);

    // Enhanced timing for crumple animation
    setTimeout(() => {
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setThought('');
          setCharacterCount(0);
          setIsAnimating(false);
        }, 1500);
      }, 800); // Increased to allow for full crumple animation
    }, 100);
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
          <h1 className="text-4xl font-bold text-blue-600 mb-4 typewriter">Unburden</h1>
          <p className="text-xl text-blue-500 typewriter">Release your thoughts into the digital void.</p>
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
          <TextArea
            value={thought}
            onChange={(e) => {
              setThought(e.target.value);
              setCharacterCount(e.target.value.length);
            }}
            fontSize={fontSize}
            isAnimating={isAnimating}
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
            transition-all duration-300 transform hover:scale-105 hover-gradient
            ${thought && !isAnimating ? 'bg-blue-500' : 'bg-gray-300'}
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
