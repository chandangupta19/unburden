import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Terms and Conditions</h1>
        <p className="text-gray-500">Last Updated: December 2024</p>
      </div>

      <div className="prose max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. ACCEPTANCE OF TERMS</h2>
          <p>
            By accessing and using Unburden ("the Platform"), you agree to be bound by these Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. AGE REQUIREMENT</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 18 years old.</li>
            <li>Or you must meet the minimum age required by your location or any other applicable laws governing you, which may exceed 18 years.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. PLATFORM PURPOSE</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Unburden is a digital platform for expressing thoughts and emotions</li>
            <li>It is NOT a substitute for professional mental health services</li>
            <li>We do not provide medical advice, counseling, or therapy</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. USER RESPONSIBILITIES</h2>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate age information</li>
            <li>Use the platform responsibly</li>
            <li>Not use the platform for illegal purposes</li>
            <li>Not attempt to circumvent platform security</li>
            <li>Accept responsibility for all content you write</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. CONTENT AND PRIVACY</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>No user content is stored or saved</li>
            <li>All content is deleted immediately upon release</li>
            <li>We use server-side analytics as described in our Privacy Policy</li>
            <li>You retain all rights to your content while using the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. DISCLAIMERS</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">6.1 Service Provided "As Is"</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>The platform is provided without warranties of any kind</li>
            <li>We do not guarantee uninterrupted or error-free service</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">6.2 Mental Health Disclaimer</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>This is not a mental health service</li>
            <li>Seek professional help for mental health concerns</li>
            <li>Not a substitute for professional treatment or advice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. LIMITATION OF LIABILITY</h2>
          <p>We are not liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Content you create</li>
            <li>Your use of the platform</li>
            <li>Any damages arising from platform use</li>
            <li>Technical issues or service interruptions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. MODIFICATIONS</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We reserve the right to modify these terms at any time</li>
            <li>Continued use after changes constitutes acceptance</li>
            <li>Check terms regularly for updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">9. GOVERNING LAW</h2>
          <p>Users must comply with their local laws when using the Platform.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">10. CONTACT</h2>
          <p>
            For questions about these terms, contact:
            <br />
            Email: umbrellalabs1@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">11. ACKNOWLEDGMENT</h2>
          <p>
            By using Unburden, you acknowledge that you have read, understood, and agree to be bound by these 
            Terms and Conditions and our Privacy Policy.
          </p>
        </section>
      </div>

      <footer className="mt-12 pt-4 border-t">
        <nav className="flex justify-center gap-6">
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          <Link to="/about" className="text-blue-500 hover:underline">About Unburden</Link>
          <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
