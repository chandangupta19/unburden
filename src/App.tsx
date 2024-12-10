import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Unburden from './Unburden';
import AboutUnburden from './pages/AboutUnburden';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

const ScrollToTop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScrollToTop><Unburden /></ScrollToTop>} />
        <Route path="/about" element={<ScrollToTop><AboutUnburden /></ScrollToTop>} />
        <Route path="/privacy" element={<ScrollToTop><PrivacyPolicy /></ScrollToTop>} />
        <Route path="/terms" element={<ScrollToTop><TermsAndConditions /></ScrollToTop>} />
      </Routes>
    </Router>
  );
};

export default App;
