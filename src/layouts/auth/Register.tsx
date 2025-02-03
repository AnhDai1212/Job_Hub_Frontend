import { error } from "console";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    // Error

    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [notification, setNotification] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Ngăn reload trang khi submit form

        const isUsernameValid = !await checkExistUsername(username);
        const isPasswordValid = !await checkPassword(password);
        const isPasswordConfirmValid = !checkPasswordConfirm(passwordConfirm);
        const isEmailValid = !await checkEmail(email);

        if (isUsernameValid && isPasswordValid && isPasswordConfirmValid && isEmailValid) {
            try {
                const url = 'http://localhost:8080/users';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        gender: gender,
                    })
                }
                );

                if (response.ok) {
                    // Reset form nếu đăng ký thành công
                    setUsername("");
                    setPassword("");
                    setPasswordConfirm("");
                    setEmail("");
                    setFirstName("");
                    setLastName("");
                    setPhone("");
                    setGender("");
                    setNotification("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
                } else {
                    console.log(response.json());
                    setNotification("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
                }
            } catch (error) {
                setNotification("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
            }
        }
    };
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);

        setErrorUsername('');
        checkExistUsername(e.target.value);
    }
    const checkExistUsername = async (username: string) => {
        const url = `http://localhost:8080/user-check/search/existsByUsername?username=${username}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorUsername('Username already exists')
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error checking username", error);
            return false;
        }
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorPassword('');

        return checkPassword(e.target.value);
    }

    const checkPassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            setErrorPassword("Password is not in correct format");
            return true;
        } else {
            setErrorPassword("");
            return false;
        }
    }
    const checkPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value);
        setErrorPasswordConfirm("");
        return checkPasswordConfirm(e.target.value)
    }

    const checkPasswordConfirm = (passwordConfirm: string) => {
        if (passwordConfirm !== password) {
            setErrorPasswordConfirm("Password re-entered is not correct");
            return true;
        } else {
            setErrorPasswordConfirm("");
            return false;
        }
    }

    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorEmail('');
        return checkEmail(e.target.value);
    }

    const checkEmail = async (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setErrorEmail("Email is not correct!");
            return true;
        } else {
            const url = `http://localhost:8080/user-check/search/existsByEmail?email=${email}`;
            try {
                const response = await fetch(url);
                const data = await response.text();
                if (data === "true") {
                    setErrorEmail('Email already exist!');
                    return true;
                }
                return false;
            } catch (error) {
                console.log("Error checking emmail!")
                return false;
            }
        }
    }
    return (
        <section>
            <div className="login-page-width">
                <div className="login-page-section">
                    <div className="login-container">
                        <div className="tab">
                            <a href="/login" >
                                Login
                            </a>
                            <a href="/register" onClick={(e) => e.preventDefault()}>Sign Up</a>
                        </div>

                        {/* REGISTRATION FORM */}
                        <div className="form-container content">
                            <form onSubmit={handleSubmit} className="registration-form">
                                <div className="form-row">
                                    {/* Column 1 */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="signupUsername">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="signupUsername"
                                                value={username}
                                                onChange={handleUsernameChange}
                                                placeholder="Enter your username"
                                            />
                                            {errorUsername && <li style={{ color: "red", fontSize: '14px' }}>{errorUsername}</li>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signupPassword">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="signupPassword"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                placeholder="Enter your password"
                                            />
                                            {errorPassword && <li style={{ color: "red", fontSize: '14px' }}>{errorPassword}</li>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signupPasswordConfirm">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="passwordConfirm"
                                                id="signupPasswordConfirm"
                                                value={passwordConfirm}
                                                onChange={checkPasswordConfirmChange}
                                                placeholder="Confirm your password"
                                            />
                                            {errorPasswordConfirm && <li style={{ color: "red", fontSize: '14px' }}>{errorPasswordConfirm}</li>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signupFirstName">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="signupFirstName"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder="Enter your first name"
                                            />
                                        </div>
                                    </div>

                                    {/* Column 2 */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="signupLastName">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="signupLastName"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder="Enter your last name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signupEmail">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="signupEmail"
                                                value={email}
                                                onChange={handleEmailChange}
                                                placeholder="Enter your email"
                                            />
                                            {errorEmail && <li style={{ color: "red", fontSize: '14px' }}>{errorEmail}</li>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signupPhone">Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                id="signupPhone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Enter your phone number"
                                            />
                                            {/* {errorPhone && <div className="error-message">{errorPhone}</div>} */}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signupGender">Gender</label>
                                            <select
                                                name="gender"
                                                id="signupGender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Sign Up</button>
                                    <div style={{ color: "red" }}>{notification}</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;