import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';
import eyeIcon from '../images/hide.png';
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

function HomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("User logged in successfully");
            navigate("/admin");
        })
        .catch((err) => {
            console.error("Login Error:", err);
            alert(err.message); // Display error message instead of code
        });
    };
    

    return (
        <div className="container">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Enter Email'
                        />
                    </div>
                    <div className="form-group password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
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
                        <Link to="/forgot" className="forgot-password-link">Forgot Password</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HomePage;
