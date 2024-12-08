import React from 'react';
import { Link } from 'react-router-dom';

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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="glass-panel rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4 text-white neon-text">{title}</h2>
    {children}
  </section>
);

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen grid-pattern relative overflow-hidden">
      {/* Decorative Elements */}
      <FloatingCircle size={10} className="absolute top-[20%] right-[30%]" />
      <FloatingCircle size={6} delay={1} className="absolute top-[40%] left-[20%]" />
      <FloatingCircle size={8} delay={2} className="absolute top-[60%] right-[20%]" />
      <FloatingCircle size={4} delay={3} className="absolute top-[30%] left-[30%]" />

      <div className="container mx-auto p-4 max-w-3xl relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4 neon-text">Terms and Conditions</h1>
          <p className="text-white/60">Last Updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Section title="1. ACCEPTANCE OF TERMS">
            <p className="text-white/80">
              By accessing and using UnburdenHQ ("the Platform"), you agree to be bound by these Terms and Conditions
              and our Privacy Policy.
            </p>
          </Section>

          <Section title="2. AGE REQUIREMENT">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>You must be at least 18 years old to use the Platform</li>
              <li>If your location requires a higher minimum age, you must meet that requirement</li>
            </ul>
          </Section>

          <Section title="3. PLATFORM PURPOSE">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>UnburdenHQ is a digital platform for expressing thoughts and emotions</li>
              <li>It is NOT a substitute for professional mental health services</li>
              <li>We do not provide medical advice, counseling, or therapy</li>
            </ul>
          </Section>

          <Section title="4. USER RESPONSIBILITIES">
            <p className="text-white/80 mb-3">You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Provide accurate age information</li>
              <li>Use the platform responsibly</li>
              <li>Not use the platform for illegal purposes</li>
              <li>Not attempt to circumvent platform security</li>
              <li>Accept responsibility for all content you write</li>
            </ul>
          </Section>

          <Section title="5. CONTENT AND PRIVACY">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>We do not store, save, or record any content you write on our platform</li>
              <li>All content is immediately and permanently deleted after you click "Release Thoughts"</li>
              <li>We have no access to your written content at any time</li>
              <li>We collect basic analytics data as described in our Privacy Policy</li>
              <li>You retain all rights to your content while using the platform</li>
            </ul>
          </Section>

          <Section title="6. THIRD-PARTY SERVICES">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>The Platform uses third-party services for analytics and functionality</li>
              <li>By using UnburdenHQ, you agree to the terms of service and privacy policies of these third-party providers</li>
              <li>We only use essential third-party services to maintain platform functionality</li>
              <li>Third-party services may collect anonymous usage data as described in our Privacy Policy</li>
            </ul>
          </Section>

          <Section title="7. DISCLAIMERS">
            <h3 className="text-xl font-bold mt-6 mb-3 text-white">7.1 Service Provided "As Is"</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>The platform is provided without warranties of any kind</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3 text-white">7.2 Mental Health Disclaimer</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>This is not a mental health service</li>
              <li>Seek professional help for mental health concerns</li>
              <li>Not a substitute for professional treatment or advice</li>
            </ul>
          </Section>

          <Section title="8. LIMITATION OF LIABILITY">
            <p className="text-white/80 mb-3">We are not liable for:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Content you create</li>
              <li>Your use of the platform</li>
              <li>Any damages arising from platform use</li>
              <li>Technical issues or service interruptions</li>
              <li>Third-party service functionality or availability</li>
            </ul>
          </Section>

          <Section title="9. MODIFICATIONS">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>We reserve the right to modify these terms at any time</li>
              <li>Changes will be effective immediately upon posting</li>
              <li>Continued use after changes constitutes acceptance</li>
              <li>It is your responsibility to review these terms periodically</li>
            </ul>
          </Section>

          <Section title="10. GOVERNING LAW">
            <p className="text-white/80">Users must comply with their local laws when using the Platform.</p>
          </Section>

          <Section title="11. CONTACT">
            <p className="text-white/80">
              For questions about these terms, contact:
              <br />
              Email: umbrellalabs1@gmail.com
            </p>
          </Section>

          <Section title="12. ACKNOWLEDGMENT">
            <p className="text-white/80">
              By using UnburdenHQ, you acknowledge that you have read, understood, and agree to be bound by these 
              Terms and Conditions and our Privacy Policy. This includes consent to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>The collection of basic analytics data as described in our Privacy Policy</li>
              <li>The use of third-party services essential for platform functionality</li>
              <li>All terms outlined in both this document and our Privacy Policy</li>
            </ul>
          </Section>
        </div>

        <footer className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/about" className="footer-link">About UnburdenHQ</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;