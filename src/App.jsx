import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './screens/FirstPage';
import SecondPage from './screens/Second/SecondPage';
import ThirdPage from './screens/Third/ThirdPage';
import FourthPage from './screens/Fourth/FourthPage';
import { UserProvider } from './context/UserContext';
import Dashboard from './screens/dashboard/Dashboard';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/third" element={<ThirdPage />} />
          <Route path="/fourth" element={<FourthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;