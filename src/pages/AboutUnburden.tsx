import React from 'react';
import { Lock, Cloud, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Reusable components for consistent design
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

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
}) => (
  <div className="glass-panel rounded-lg p-6 hover:shadow-xl transition-all">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10">
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  </div>
);

const AboutUnburden: React.FC = () => {
  return (
    <div className="min-h-screen grid-pattern relative overflow-hidden">
      {/* Decorative Elements */}
      <FloatingCircle size={10} className="absolute top-[20%] right-[30%]" />
      <FloatingCircle size={6} delay={1} className="absolute top-[40%] left-[20%]" />
      <FloatingCircle size={8} delay={2} className="absolute top-[60%] right-[20%]" />
      <FloatingCircle size={4} delay={3} className="absolute top-[30%] left-[30%]" />

      <div className="container mx-auto p-4 max-w-3xl relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4 neon-text">About UnburdenHQ</h1>
        </div>

        <div className="space-y-8">
          <div className="glass-panel rounded-lg p-8">
            <p className="text-white/80 mb-6 text-lg">
              UnburdenHQ is your digital space for emotional release. We understand that life can be overwhelming, 
              and having a safe, private space to express emotions is essential. With UnburdenHQ, you can write down 
              your thoughts, frustrations, or feelings, and when you're ready, a simple click of the "Release Thoughts" 
              button erases them.
            </p>
            
            <p className="text-white/80 mb-6 text-lg">
              This act of deleting your words is designed to help you reflect, process, and move forward.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-white neon-text">Key Features:</h2>
            <div className="grid gap-6">
              <FeatureCard
                icon={Lock}
                title="Secure & Private"
                description="Your thoughts remain completely private with no data storage."
              />
              <FeatureCard
                icon={Cloud}
                title="Feel Lighter"
                description="Your words vanish instantly after release, leaving no digital footprint."
              />
              <FeatureCard
                icon={Heart}
                title="Express Yourself"
                description="A simple way to express and let go of overwhelming thoughts."
              />
            </div>
          </div>

          <div className="glass-panel rounded-lg p-6 border border-white/10">
            <p className="text-sm font-medium text-white/80">
              <strong className="text-white">Disclaimer:</strong> UnburdenHQ is not a substitute for professional mental health advice or therapy. 
              If you are experiencing severe emotional distress, please seek help from a qualified professional.
            </p>
          </div>

          <div className="text-center text-white/60">
            Contact us: umbrellalabs1@gmail.com
          </div>
        </div>

        <footer className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms & Conditions</Link>
        </footer>
      </div>
    </div>
  );
};

export default AboutUnburden;
