import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Header-footer/navbar';
import './assets/css/style.css';
import './assets/lib/animate/animate.min.css';
import './assets/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Footer from './layouts/Header-footer/footer';
import HomePage from './layouts/homepage/HomePage';
import Login from './layouts/auth/Login';
import Register from './layouts/auth/Register';
import Activation from './layouts/auth/Activation';
import ProfilePage from './layouts/Profile/Profile';
import ProtectedRoutes from './api/ProtectedRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Authenticate from './layouts/auth/Authenticate';

function App() {
  return (
    <GoogleOAuthProvider clientId="3964472893-0g9mdp6aaka2ml6f8cccuq60feha3fdf.apps.googleusercontent.com">
      <div className="container-xxl bg-white p-0">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/activate/:email/:activationCode" element={<Activation />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
