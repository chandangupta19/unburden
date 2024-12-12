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
          <Section title="1. ACCEPTANCE OF TERMS">
            <p className="text-white/80">
              By accessing and using UnburdenHQ ("the Platform"), you agree to be bound by these Terms and Conditions
              and our Privacy Policy. Please read them carefully to understand how your content exists on our platform.
            </p>
          </Section>

          <Section title="2. AGE REQUIREMENT">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>You must be at least 18 years old to use the Platform</li>
              <li>If your location requires a higher minimum age, you must meet that requirement</li>
            </ul>
          </Section>

          <Section title="3. PLATFORM PURPOSE AND LIMITATIONS">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>UnburdenHQ is a digital platform for expressing thoughts and emotions</li>
              <li>It is NOT a substitute for professional mental health services</li>
              <li>We do not provide medical advice, counseling, or therapy</li>
              <li>The platform offers a temporary space for expression, not storage</li>
            </ul>
          </Section>

          <Section title="4. HOW YOUR CONTENT EXISTS">
            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">4.1 Text Content</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Your typed thoughts exist only temporarily in your device's memory</li>
              <li>Nothing is saved to storage or transmitted to servers</li>
              <li>Content is immediately discarded upon release</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">4.2 Voice Content</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Your spoken thoughts exist only momentarily in your device's memory</li>
              <li>No audio is recorded or saved anywhere</li>
              <li>Voice is processed locally and immediately discarded</li>
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
              <li>Understand the temporary nature of all content</li>
            </ul>
          </Section>

          <Section title="6. PRIVACY AND DATA HANDLING">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Your content exists only temporarily in your device's memory while in use</li>
              <li>No content is ever saved to storage systems</li>
              <li>No content is ever transmitted to servers</li>
              <li>All content is immediately discarded upon release</li>
              <li>We collect only anonymous site analytics as described in our Privacy Policy</li>
            </ul>
          </Section>

          <Section title="7. THIRD-PARTY SERVICES">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>The Platform uses minimal third-party services for basic functionality</li>
              <li>Netlify provides anonymous site analytics only</li>
              <li>No third-party services have access to your content</li>
            </ul>
          </Section>

          <Section title="8. DISCLAIMERS">
            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">8.1 Service Provided "As Is"</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>The platform is provided without warranties of any kind</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">8.2 Mental Health Disclaimer</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>This is not a mental health service</li>
              <li>Seek professional help for mental health concerns</li>
              <li>Not a substitute for professional treatment or advice</li>
            </ul>
          </Section>

          <Section title="9. LIMITATION OF LIABILITY">
            <p className="text-white/80 mb-3">We are not liable for:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Content you create</li>
              <li>Your use of the platform</li>
              <li>Any damages arising from platform use</li>
              <li>Technical issues or service interruptions</li>
              <li>Third-party service functionality or availability</li>
            </ul>
          </Section>

          <Section title="10. MODIFICATIONS">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>We reserve the right to modify these terms at any time</li>
              <li>Changes will be effective immediately upon posting</li>
              <li>Continued use after changes constitutes acceptance</li>
              <li>It is your responsibility to review these terms periodically</li>
            </ul>
          </Section>

          <Section title="11. GOVERNING LAW">
            <p className="text-white/80">Users must comply with their local laws when using the Platform.</p>
          </Section>

          <Section title="12. CONTACT">
            <p className="text-white/80">
              For questions about these terms, contact:
              <br />
              Email: umbrellalabs1@gmail.com
            </p>
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