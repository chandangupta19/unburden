import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="glass-panel rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
    {children}
  </section>
);

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/60">Last Updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Section title="1. INTRODUCTION">
            <p className="text-white/80">
              Welcome to UnburdenHQ ("the Platform"). This Privacy Policy explains in detail how we handle your information 
              when you use the Platform. Our core principle is absolute privacy - your thoughts remain yours alone.
            </p>
          </Section>

          <Section title="2. HOW YOUR CONTENT EXISTS">
            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">2.1 Text Input</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>When you type, your text exists only temporarily in your device's memory (RAM)</li>
              <li>Nothing is ever saved to your device's storage</li>
              <li>No text is ever transmitted to any servers</li>
              <li>All content is immediately discarded when you release your thoughts</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">2.2 Voice Input</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>When you speak, your voice exists only momentarily in your device's memory</li>
              <li>Audio is processed locally on your device only</li>
              <li>No audio is ever recorded or saved anywhere</li>
              <li>Voice data is immediately discarded as you speak</li>
              <li>The experience is equivalent to speaking into an unplugged microphone</li>
            </ul>

            <div className="bg-white/5 p-6 rounded-lg my-4 border border-white/10">
              <p className="font-semibold mb-2 text-white">What is NOT collected or stored:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/80">
                <li>Your written content</li>
                <li>Your voice recordings</li>
                <li>Personal identification</li>
                <li>User accounts or profiles</li>
                <li>Device information</li>
                <li>Usage patterns</li>
              </ul>
            </div>
          </Section>

          <Section title="3. TECHNICAL TRANSPARENCY">
            <p className="text-white/80 mb-4">
              For complete transparency about how the platform works:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Your device's temporary memory (RAM) briefly holds your content while you type or speak</li>
              <li>This temporary memory is automatically cleared when you:
                <ul className="list-disc pl-6 mt-2">
                  <li>Release your thoughts</li>
                  <li>Close or refresh the page</li>
                  <li>Navigate away from the platform</li>
                </ul>
              </li>
              <li>No data persists beyond your current session</li>
              <li>We have no servers storing or processing your content</li>
            </ul>
          </Section>

          <Section title="4. SITE ANALYTICS">
            <p className="text-white/80">
              We use basic, anonymous site analytics from Netlify to understand general site usage. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Page views (number of visits)</li>
              <li>Basic performance metrics</li>
              <li>No personal data or content is ever included in analytics</li>
            </ul>
          </Section>

          <Section title="5. DATA SECURITY">
            <p className="text-white/80">
              Since we don't store any data, our security model is simple - your content exists only momentarily 
              in your device's memory. The security of your experience depends only on your device and internet 
              connection security.
            </p>
          </Section>

          <Section title="6. CHILDREN'S PRIVACY">
            <p className="text-white/80">
              Our platform is not intended for individuals under 18 years of age. We do not knowingly collect 
              or process any information from children.
            </p>
          </Section>

          <Section title="7. CHANGES TO THIS POLICY">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>We reserve the right to modify this Privacy Policy at any time</li>
              <li>Changes will be effective immediately upon posting</li>
              <li>Continued use after changes constitutes acceptance</li>
              <li>It is your responsibility to review this Privacy Policy periodically</li>
            </ul>
          </Section>

          <Section title="8. CONTACT US">
            <p className="text-white/80">
              For any questions about this Privacy Policy, please contact us at:
              <br />
              Email: umbrellalabs1@gmail.com
            </p>
          </Section>
        </div>

        <footer className="footer-links">
          <button onClick={() => navigate('/')} className="footer-link">Home</button>
          <button onClick={() => navigate('/about')} className="footer-link">About UnburdenHQ</button>
          <button onClick={() => navigate('/terms')} className="footer-link">Terms & Conditions</button>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;