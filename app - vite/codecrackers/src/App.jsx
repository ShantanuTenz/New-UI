import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './components/auth/signin';
import SignupPage from './components/auth/singnup';
import OTPVerificationPage from './components/auth/verify-otp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Pricing from './pages/pricing/Pricing';

function App() {
  // Simulating an authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage or cookies
    const token = localStorage.getItem('loggedIn');
    if (token) {
      console.log('token', token);
      setIsAuthenticated(true);
    }
  }, []);

  // Define private routes
  const privateRoutes = [
    { path: '/dashboard', component: Dashboard },
    // { path: '/profile', component: Profile },
    // { path: '/settings', component: Settings },
  ];
  console.log('isAuthenticated', isAuthenticated);
  
  return (
    <Router>
      <ToastContainer />
      <Routes>
        
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Dynamically render PrivateRoute for each route */}
        {privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              isAuthenticated ? React.createElement(route.component) : <Navigate to="/login" />
            }
          />
        ))}

        {/* Redirect from '/' to login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
