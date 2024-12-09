```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Unburden from './components/Unburden';
import AboutUnburden from './pages/AboutUnburden';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Unburden />} />
        <Route path="/about" element={<AboutUnburden />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
};

export default App;
```
