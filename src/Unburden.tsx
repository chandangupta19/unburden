// ... (previous imports remain the same)

// Custom Textarea Component
const AutoResizeTextarea: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fontSize: number;
  isAnimating: boolean;
  maxLength: number;
}> = ({ value, onChange, fontSize, isAnimating, maxLength }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set new height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent form submission
      const cursorPosition = e.currentTarget.selectionStart;
      const newValue = value.slice(0, cursorPosition) + '\n' + value.slice(cursorPosition);
      const event = {
        target: { value: newValue }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(event);
    }
  };

  const handleFocus = () => {
    // Scroll the textarea into view when focused
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className={`textarea-container ${isAnimating ? 'animate-slide-down' : ''}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        style={{ fontSize: `${fontSize}px` }}
        className={`w-full p-4 border rounded-md
          focus:ring-2 focus:ring-blue-200 transition-all duration-300
          text-base resize-none custom-scrollbar
          min-h-[200px]`}
        placeholder="Pour your heart out..."
        maxLength={maxLength}
      />
    </div>
  );
};

// ... (other components remain the same)

const Unburden: React.FC = () => {
  // ... (previous state declarations remain the same)

  // Update the Card component section
  return (
    <>
      {/* ... (previous components remain the same) */}
      
      <Card className="w-full p-6 shadow-lg relative overflow-hidden">
        <AutoResizeTextarea
          value={thought}
          onChange={(e) => {
            setThought(e.target.value);
            setCharacterCount(e.target.value.length);
          }}
          fontSize={fontSize}
          isAnimating={isAnimating}
          maxLength={MAX_CHARACTERS}
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

      {/* ... (rest of the component remains the same) */}
    </>
  );
};

export default Unburden;
