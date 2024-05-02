import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';
import eyeIcon from '../images/hide.png';

function HomePage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username || !password) {
            console.log('Username and password are required.');
            return;
        }
        if (username === 'admin' && password === 'Rictm$@2792') {
            console.log('Admin login successful.');
            setUsername('');
            setPassword('');
            navigate('/admin');
        } else {
            console.log('Regular user login.');
            console.log('Username:', username);
            console.log('Password:', password);
            setUsername('');
            setPassword('');
            navigate('/dashboard');
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder='Enter Username'
                        />
                    </div>
                    <div className="form-group password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Enter Password'
                        />
                        <button
                            type="button"
                            className="eye-button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <img src={eyeIcon} alt={showPassword ? "Hide password" : "Show password"} />
                        </button>
                    </div>
                    <button className='btnlogin' type="submit">Login</button>
                    <div className="links">
                        <Link to="/signup" className="signup-link">Sign Up</Link>
                        <span className="separator"> | </span>
                        <Link to="/forgot-password" className="forgot-password-link">Forgot Password</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HomePage;
