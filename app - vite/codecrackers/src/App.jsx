import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pricing from './pages/pricing/Pricing';
import About from './components/Initial-Render/about/About';
import SignupPage from './components/Initial-Render/auth/singnup';
import SignInPage from './components/Initial-Render/auth/signin';
import Home from './components/Initial-Render/home';
import Dashboard from './components/student/dasboard/Dashboard';

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
    { path: '/student/dashboard', component: Dashboard },
    // { path: '/profile', component: Profile },
    // { path: '/settings', component: Settings },
  ];
  console.log('isAuthenticated', isAuthenticated);
  
  return (
    <Router>
      <ToastContainer />
      <Routes>
        
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path='/student/dashboard' element={<Dashboard />} />

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
