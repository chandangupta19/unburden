```typescript
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
              Welcome to UnburdenHQ ("the Platform"). This Privacy Policy explains how we handle any information when you use the Platform. 
              Our core principle is to provide a space where you can express yourself freely while maintaining your privacy.
            </p>
          </Section>

          <Section title="2. INFORMATION COLLECTION AND USE">
            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">2.1 User Content</h3>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>We do not store, save, or record any content you write on our platform</li>
              <li>All content is immediately and permanently deleted after you click "Release Thoughts"</li>
              <li>We have no access to your written content at any time</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-white">2.2 Site Analytics</h3>
            <p className="text-white/80">
              We use basic analytics to understand general site usage. This includes standard, anonymous usage data 
              that helps us improve the platform.
            </p>

            <div className="bg-white/5 p-6 rounded-lg my-4 border border-white/10">
              <p className="font-semibold mb-2 text-white">What is NOT collected:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/80">
                <li>Your written content</li>
                <li>Personal identification</li>
                <li>User accounts or profiles</li>
              </ul>
            </div>
          </Section>

          <Section title="3. DATA SECURITY">
            <p className="text-white/80">
              We implement appropriate technical measures to maintain the security of our platform. However, 
              please note that your content is only as secure as your own device and internet connection.
            </p>
          </Section>

          <Section title="4. CHILDREN'S PRIVACY">
            <p className="text-white/80">
              Our platform is not intended for individuals under 18 years of age. We do not knowingly collect 
              information from children.
            </p>
          </Section>

          <Section title="5. CHANGES TO THIS POLICY">
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>We reserve the right to modify this Privacy Policy at any time</li>
              <li>Continued use after changes constitutes acceptance</li>
              <li>Changes will be effective immediately upon posting</li>
              <li>It is your responsibility to review this Privacy Policy periodically</li>
            </ul>
          </Section>

          <Section title="6. CONTACT US">
            <p className="text-white/80">
              For any questions about this Privacy Policy, please contact us at:
              <br />
              Email: umbrellalabs1@gmail.com
            </p>
          </Section>

          <Section title="7. CONSENT">
            <p className="text-white/80">
              By using UnburdenHQ, you acknowledge and agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>The collection of basic analytics data as described above</li>
              <li>All privacy terms outlined in this policy</li>
              <li>By agreeing to these terms, you agree to terms and conditions of our third-party service providers</li>
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
```