import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Header-footer/navbar';
import './assets/css/vertical-layout-light/style.css';
import './assets/vendors/feather/feather.css';
import './assets/vendors/ti-icons/css/themify-icons.css';
import './assets/vendors/css/vendor.bundle.base.css';
import './assets/css/style.css';
import './assets/lib/animate/animate.min.css';
import './assets/css/bootstrap.min.css';
import './assets/images/favicon.png';
import Footer from './layouts/Header-footer/footer';
import HomePage from './layouts/homepage/HomePage';
import Login from './layouts/auth/Login';
import Register from './layouts/auth/Register';
import Activation from './layouts/auth/Activation';


function App() {
    useEffect(() => {
        // Import thư viện JavaScript cần thiết cho ứng dụng
        const scriptJQuery = document.createElement('script');
        scriptJQuery.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
        scriptJQuery.async = true;
        document.body.appendChild(scriptJQuery);

        const scriptBootstrap = document.createElement('script');
        scriptBootstrap.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js';
        scriptBootstrap.async = true;
        document.body.appendChild(scriptBootstrap);

          // Dọn dẹp khi component bị unmount
          return () => {
            document.body.removeChild(scriptJQuery);
            document.body.removeChild(scriptBootstrap);
          };
    }, []);


  return (
    <div className="container-xxl bg-white p-0">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate/:email/:activationCode" element={<Activation/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;