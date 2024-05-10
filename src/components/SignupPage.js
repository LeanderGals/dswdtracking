import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import eyeIcon from '../images/hide.png';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 

    const handleSignup = (e) => {
        e.preventDefault();
    
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("User signed up successfully");
            navigate("/admin");
        })
        .catch((err) => {
            console.error("Signup Error:", err);
            alert(err.message); // Display error message instead of code
        }); 
    };

    return (
        <div className="container">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Enter Email'
                        />
                    </div>
                    <div className="form-group password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
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
                    <button className='btnsignup' type="submit">Sign Up</button>
                    <div className="links">
                        <Link to="/" className="login-link">Login</Link>
                        <span className="separator"> | </span>
                        <Link to="/forgot-password" className="forgot-password-link">Forgot Password</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
