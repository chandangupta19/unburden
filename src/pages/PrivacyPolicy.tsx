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
              UnburdenHQ is designed with privacy at its core. We believe in complete transparency about how your content exists within our platform. This Privacy Policy explains our practices and commitments to your privacy.
            </p>
          </Section>

          <Section title="2. HOW YOUR CONTENT EXISTS">
            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Text Content:</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>When you type, your text exists only in your device's temporary memory while you write</li>
              <li>Content remains only until you release it or leave the page</li>
              <li>Nothing is written to permanent storage</li>
              <li>Content is automatically cleared when you release thoughts or leave the page</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Voice Content:</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>When recording, audio is processed using your device's temporary memory</li>
              <li>Audio stays in temporary memory to enable features like pause/resume</li>
              <li>Nothing is written to permanent storage</li>
              <li>All audio data is cleared when you release recording or leave the page</li>
            </ul>
          </Section>

          <Section title="3. ANALYTICS AND THIRD-PARTY SERVICES">
            <p className="text-white/80 mb-4">
              We use Netlify for hosting and basic anonymous analytics:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Only basic site usage data is collected (like page views)</li>
              <li>No personal identification</li>
              <li>No content tracking</li>
              <li>By using UnburdenHQ, you agree to Netlify's Privacy Policy and Terms of Service</li>
            </ul>
          </Section>

          <Section title="4. WHAT WE DON'T DO">
            <p className="text-white/80">We do not:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Use permanent storage</li>
              <li>Create backups</li>
            </ul>
          </Section>

          <Section title="5. AGE REQUIREMENT">
            <p className="text-white/80">
              You must be at least 18 years old. Or, you must meet the minimum age required by your location or any other applicable laws governing you, which may exceed 18 years.
            </p>
          </Section>

          <Section title="6. CHANGES TO THIS POLICY">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>We reserve the right to modify this policy at any time</li>
              <li>Changes are effective immediately upon posting</li>
              <li>Your continued use constitutes acceptance of changes</li>
            </ul>
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