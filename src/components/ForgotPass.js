import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPass.css';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setEmailSent(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    {emailSent ? (
                        <p className="email-sent-message">
                            An email with instructions to reset your password has been sent to {email}. 
                            Please check your inbox.
                        </p>
                    ) : (
                        <button className="reset-password-button" type="submit">
                            Reset Password
                        </button>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    <div className="links">
                        <Link to="/" className="login-link">Login</Link>
                        <span className="separator"> | </span>
                        <Link to="/signup" className="signup-link">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
