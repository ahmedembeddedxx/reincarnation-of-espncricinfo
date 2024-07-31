import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Function to handle the login process
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/authenticate', {
                username,
                password,
            });

            if (response.data.success) {
                // Call the onLogin callback function passed as a prop
                onLogin();
            } else {
                setLoginError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            setLoginError('An error occurred during authentication. Please try again later.');
        }
    };

    // Handle key down events for the username input field
    const handleUsernameKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Focus on the password input field when Enter is pressed
            document.getElementById('passwordInput').focus();
        }
    };

    // Handle key down events for the password input field
    const handlePasswordKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Trigger the login process when Enter is pressed
            handleLogin();
        }
    };

    return (
        <div>
            <div id="SignInFormTable">
                <label htmlFor="username" id="input_creds">
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                        Username:
                    </div>
                    <input
                        type="text"
                        className="input_creds"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleUsernameKeyDown}
                    />
                </label>
                <label htmlFor="password" id="input_creds">
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                        Password:
                    </div>
                    <input
                        type="password"
                        id="passwordInput"
                        className="input_creds"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handlePasswordKeyDown}
                    />
                </label>
                <div style={{ paddingRight: '100px' }}>
                    <button className="b2" onClick={handleLogin}>
                        Log In
                    </button>
                </div>

                {/* Display login error message, if any */}
                {loginError && <div style={{ color: 'red' }}>{loginError}</div>}

                <div id="loginStatus"></div>
            </div>
            <br />
            <br />
            <hr />
            <footer>
                <p>ESPNCricInfo Reincarnated</p>
                <p>Copyright 2024. All Rights Reserved.</p>
                <a href="https://github.com/ahmedembeddedx/the-reincarnation-of-espncricinfo/">
                    <img src="https://cdn-icons-png.freepik.com/512/919/919847.png" alt="GitHub" height="40" />
                </a>
            </footer>
        </div>
    );
}
