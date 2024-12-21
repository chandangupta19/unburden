import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="glass-panel rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
    {children}
  </section>
);

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Terms and Conditions</h1>
          <p className="text-white/60">Last Updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Section title="1. AGE REQUIREMENT">
            <p className="text-white/80">
              You must be at least 18 years old. Or, you must meet the minimum age required by your location or any other applicable laws governing you, which may exceed 18 years.
            </p>
          </Section>

          <Section title="2. PLATFORM PURPOSE">
            <p className="text-white/80">
              UnburdenHQ is a digital platform for expressing thoughts and emotions. It is NOT a substitute for professional mental health services. We do not provide medical advice, counseling, or therapy.
            </p>
          </Section>

          <Section title="3. HOW YOUR CONTENT EXISTS">
            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Text Input:</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Your typed content exists only in your device's temporary memory while you write</li>
              <li>Content remains only until you release it or leave the page</li>
              <li>Nothing is written to permanent storage</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Voice Input:</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Audio is processed in real-time using your device's temporary memory</li>
              <li>Paused recordings are temporarily held in memory</li>
              <li>All audio data is cleared upon release or when you leave the page</li>
            </ul>
          </Section>

          <Section title="4. THIRD PARTY SERVICES">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>We use Netlify for hosting and basic anonymous analytics</li>
              <li>By using UnburdenHQ, you agree to Netlify's Terms of Service and Privacy Policy</li>
              <li>Analytics data is limited to basic site usage with no personal identification</li>
              <li>No third-party services have access to your content</li>
            </ul>
          </Section>

          <Section title="5. USER RESPONSIBILITIES">
            <p className="text-white/80 mb-3">You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Provide accurate age information</li>
              <li>Use the platform responsibly</li>
              <li>Not use the platform for illegal purposes</li>
              <li>Not attempt to circumvent platform security</li>
              <li>Accept responsibility for all content you create</li>
            </ul>
          </Section>

          <Section title="6. LIMITATIONS AND DISCLAIMERS">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>The platform is provided "as is" without warranties</li>
              <li>We do not guarantee uninterrupted service</li>
              <li>This is not a mental health service</li>
              <li>Seek professional help for mental health concerns</li>
            </ul>
          </Section>

          <Section title="7. CHANGES TO TERMS">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>We reserve the right to modify these terms</li>
              <li>Changes are effective immediately upon posting</li>
              <li>Continued use constitutes acceptance of changes</li>
            </ul>
          </Section>
        </div>

        <footer className="footer-links">
          <button onClick={() => navigate('/')} className="footer-link">Home</button>
          <button onClick={() => navigate('/about')} className="footer-link">About UnburdenHQ</button>
          <button onClick={() => navigate('/privacy')} className="footer-link">Privacy Policy</button>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;