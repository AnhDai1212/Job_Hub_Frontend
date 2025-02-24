import React, { ChangeEvent, useEffect, useState } from "react";
import assert from "assert";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { KEY_TOKEN } from "../../service/LocalStorageService";


function Navbar() {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem(KEY_TOKEN);
    const handleLogin = () => {
        navigate('login')
    }
    const handleLogout = () => {
        localStorage.removeItem(KEY_TOKEN);
        console.log("Bạn đã đăng xuất");
        navigate('/');
    }
    return (
        <div className="container-xxl bg-white p-0">

            {/* Navbar Start */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                <a href="#" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                    <h1 className="m-0 text-primary">JobHub</h1>
                </a>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto">
                        <a href="#" className="nav-item nav-link">Home</a>
                        <a href="#" className="nav-item nav-link">About</a>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Jobs</a>
                            <div className="dropdown-menu">
                                <a href="#" className="dropdown-item">Job List</a>
                                <a href="#" className="dropdown-item">Job Detail</a>
                            </div>
                        </div>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu">
                                <a href="#" className="dropdown-item">Job Category</a>
                                <a href="#" className="dropdown-item">Testimonial</a>
                            </div>
                        </div>
                        <a href="#" className="nav-item nav-link active">Contact</a>
                    </div>
                    {/* Icon cá nhân + Dropdown menu */}
                    <div className="nav-item dropdown me-3">
                        <a href="#" className="nav-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
                            <img src="./assets/images/favicon.png" alt="User Icon" width="30" height="30" className="rounded-circle" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end rounded-0 m-0">
                            {isLoggedIn ? (
                                <>
                                    <a href="/profile" className="dropdown-item">Profile</a>
                                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                </>
                            ) : (
                                <button onClick={handleLogin} className="dropdown-item">Login</button>
                            )}
                        </div>
                    </div>



                    {/* <a href="#" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Post A Job<i className="fa fa-arrow-right ms-3"></i></a> */}
                </div>
            </nav>
            {/* Navbar End */}
        </div>
    );
}

export default Navbar;
