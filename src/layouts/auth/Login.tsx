import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault(); // Ngăn reload trang khi submit form

        const loginRequest = {
            username: username,
            password: password,
        };
        console.log('Login Request:', loginRequest);
        fetch('http://localhost:8080/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequest),
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    const data = await response.json();
                    throw new Error(data.message);
                }
            })
            .then((data) => {
                const { jwt } = data;
                localStorage.setItem('token', jwt); // Lưu JWT vào localStorage
                setError('Đăng nhập thành công.');
                navigate('/'); // Điều hướng đến trang chủ
            })
            .catch((error) => {
                // console.error('Đăng nhập thất bại: ', error);
                setError(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại mật khẩu hoặc tên đăng nhập.');
            });
    };

    return (
        <section>
            
            <div className="login-page-width">
                <div className="login-page-section">
                    <div className="login-container">
                        <div className="tab">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                                Login
                            </a>
                            <a href="/register">Sign Up</a>
                        </div>
                        <div className="content" id="loginTab">
                            <form onSubmit={handleLogin}>
                                {error && <span style={{ color: 'red' }}>{error}</span>}

                                {/* Username */}
                                <div className="form-group">
                                    <label htmlFor="loginUsername">Username:</label>
                                    <input
                                        name="username"
                                        type="text"
                                        id="loginUsername"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="form-group">
                                    <label htmlFor="loginPassword">Password:</label>
                                    <input
                                        name="password"
                                        type="password"
                                        id="loginPassword"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;