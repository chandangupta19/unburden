import React from 'react';
import { Lock, Cloud, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUnburden: React.FC = () => {
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About UnburdenHQ</h1>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          UnburdenHQ is your digital space for emotional release. We understand that life can be overwhelming, 
          and having a safe, private space to express emotions is essential. With UnburdenHQ, you can write down 
          your thoughts, frustrations, or feelings, and when you're ready, a simple click of the "Release Thoughts" 
          button erases them.
        </p>
        
        <p className="text-gray-600 mb-6">
          This act of deleting your words is designed to help you reflect, process, and move forward.
        </p>

        <div className="bg-gray-50 p-8 rounded-lg my-8">
          <h2 className="text-2xl font-bold mb-6">Key Features:</h2>
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="text-blue-500" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Secure & Private</h3>
                <p className="text-gray-600">Your thoughts remain completely private with no data storage.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Cloud className="text-purple-500" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Feel Lighter</h3>
                <p className="text-gray-600">Your words vanish instantly after release, leaving no digital footprint.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="text-pink-500" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Express Yourself</h3>
                <p className="text-gray-600">A simple way to express and let go of overwhelming thoughts.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-sm font-medium text-blue-800">
            <strong>Disclaimer:</strong> UnburdenHQ is not a substitute for professional mental health advice or therapy. 
            If you are experiencing severe emotional distress, please seek help from a qualified professional.
          </p>
        </div>

        <div className="text-center text-gray-500">
          Contact us: umbrellalabs1@gmail.com
        </div>
      </div>

      <footer className="mt-12 pt-4 border-t">
        <nav className="flex justify-center gap-6">
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="text-blue-500 hover:underline">Terms & Conditions</Link>
        </nav>
      </footer>
    </div>
  );
};

export default AboutUnburden;
