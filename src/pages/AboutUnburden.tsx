```typescript
import React, { useEffect } from 'react';
import { Lock, Cloud, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUnburden: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About UnburdenHQ</h1>
        </div>

        <div className="glass-panel rounded-lg p-8 mb-8">
          <p className="text-white/80 mb-6">
            UnburdenHQ is your digital space for emotional release. We understand that life can be overwhelming, 
            and having a safe, private space to express emotions is essential. With UnburdenHQ, you can write down 
            your thoughts, frustrations, or feelings, and when you're ready, a simple click of the "Release Thoughts" 
            button erases them.
          </p>
          
          <p className="text-white/80 mb-6">
            This act of deleting your words is designed to help you reflect, process, and move forward.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Key Features:</h2>
          <div className="grid gap-6">
            <div className="glass-panel rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10">
                  <Lock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Secure & Private</h3>
                  <p className="text-white/70">Your thoughts remain completely private with no data storage.</p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10">
                  <Cloud className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Feel Lighter</h3>
                  <p className="text-white/70">Your words vanish instantly after release, leaving no digital footprint.</p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10">
                  <Heart className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Express Yourself</h3>
                  <p className="text-white/70">A simple way to express and let go of overwhelming thoughts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-lg p-6 mt-8 mb-8">
          <p className="text-sm font-medium text-white/80">
            <strong className="text-white">Disclaimer:</strong> UnburdenHQ is not a substitute for professional mental health advice or therapy. 
            If you are experiencing severe emotional distress, please seek help from a qualified professional.
          </p>
        </div>

        <div className="text-center text-white/60">
          Contact us: umbrellalabs1@gmail.com
        </div>

        <footer className="footer-links">
          <button onClick={() => navigate('/')} className="footer-link">Home</button>
          <button onClick={() => navigate('/privacy')} className="footer-link">Privacy Policy</button>
          <button onClick={() => navigate('/terms')} className="footer-link">Terms & Conditions</button>
        </footer>
      </div>
    </div>
  );
};

export default AboutUnburden;
```
