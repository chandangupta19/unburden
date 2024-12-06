import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
        <p className="text-gray-500">Last Updated: December 2024</p>
      </div>

      <div className="prose max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. INTRODUCTION</h2>
          <p>
            Welcome to UnburdenHQ ("the Platform"). This Privacy Policy explains how we handle any information when you use the Platform. 
            Our core principle is to provide a space where you can express yourself freely while maintaining your privacy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. INFORMATION COLLECTION AND USE</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">2.1 User Content</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not store, save, or record any content you write on our platform</li>
            <li>All content is immediately and permanently deleted after you click "Release Thoughts"</li>
            <li>We have no access to your written content at any time</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">2.2 Site Analytics</h3>
          <p>We use industry-standard server-side analytics that collects:</p>
          
          <div className="bg-gray-50 p-6 rounded-lg my-4">
            <p className="font-bold mb-2">What is collected:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP addresses</li>
              <li>Country/region of access</li>
              <li>Pages visited</li>
              <li>Browser type</li>
              <li>Visit duration</li>
              <li>Other standard analytics data</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg my-4">
            <p className="font-bold mb-2">What is NOT collected:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your written content</li>
              <li>Personal identification</li>
              <li>Cookies or tracking scripts</li>
              <li>User accounts or profiles</li>
            </ul>
          </div>

          <p className="mt-4">
            <strong>Why we collect this:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To understand site usage</li>
            <li>To improve user experience</li>
            <li>To monitor site performance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. DATA SECURITY</h2>
          <p>
            We implement appropriate technical measures to maintain the security of our platform. However, 
            please note that your content is only as secure as your own device and internet connection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. CHILDREN'S PRIVACY</h2>
          <p>
            Our platform is not intended for individuals under 18 years of age. We do not knowingly collect 
            information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. THIRD-PARTY SERVICES</h2>
          <p>
            We use third-party services for basic analytics and platform functionality. By using UnburdenHQ, you acknowledge 
            that these services may collect information as described in this Privacy Policy and you agree to their respective 
            terms of service and privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. CHANGES TO THIS POLICY</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We reserve the right to modify this Privacy Policy at any time</li>
            <li>Continued use after changes constitutes acceptance</li>
            <li>Changes will be effective immediately upon posting</li>
            <li>It is your responsibility to review this Privacy Policy periodically</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. CONTACT US</h2>
          <p>
            For any questions about this Privacy Policy, please contact us at:
            <br />
            Email: umbrellalabs1@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. CONSENT</h2>
          <p>
            By using UnburdenHQ, you acknowledge and agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The collection of basic analytics data through our server-side analytics tools as described above</li>
            <li>The terms and conditions of our third-party service providers</li>
            <li>All privacy terms outlined in this policy</li>
          </ul>
        </section>
      </div>

      <footer className="mt-12 pt-4 border-t">
        <nav className="flex justify-center gap-6">
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          <Link to="/about" className="text-blue-500 hover:underline">About UnburdenHQ</Link>
          <Link to="/terms" className="text-blue-500 hover:underline">Terms & Conditions</Link>
        </nav>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
