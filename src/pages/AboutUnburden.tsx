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
            UnburdenHQ is your digital space for emotional release. Whether through voice or text, express your thoughts freely in a completely private environment. Like speaking to the wind or writing in sand, your words exist only in the moment and vanish instantly upon release.
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
                  <h3 className="font-semibold text-lg mb-2 text-white">Complete Privacy</h3>
                  <p className="text-white/70">
                    - Your thoughts, written or spoken, exist only while you express them
                    <br/>
                    - Nothing is stored permanently and vanishes instantly upon release
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10">
                  <Cloud className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Express Freely</h3>
                  <p className="text-white/70">
                    - Share your thoughts through text or voice
                    <br/>
                    - Take your time, pause when needed
                    <br/>
                    - Release when you're ready
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10">
                  <Heart className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Safe Space</h3>
                  <p className="text-white/70">No accounts needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
          <p className="text-white/80">
            Your thoughts, written or spoken, exist only momentarily while you type or speak, and disappear completely when released. Think of it like writing on a fogged mirror - present only until you wipe it away.
          </p>
        </div>

        <div className="glass-panel rounded-lg p-6 mt-8 mb-8">
          <p className="text-sm font-medium text-white/80">
            <strong className="text-white">Disclaimer:</strong> UnburdenHQ is not a substitute for professional mental health advice or therapy. If you are experiencing severe emotional distress, please seek help from a qualified professional.
          </p>
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