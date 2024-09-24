'use client'; // Mark this component as a client component

import React, { useState } from 'react';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);  // Toggle between login and signup
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async (event) => {
      event.preventDefault();
      const response = await fetch('http://localhost:8082/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
          console.log('Login Successful', data);
          // Redirect or manage session
      } else {
          console.error('Login Failed', data.message);
          // Optionally update UI with error message
      }
  };
  
  

  const handleSignup = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8082/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
        console.log('Signup Successful', data);
        // Redirect or manage session
    } else {
        console.error('Signup Failed', data.message);
        // Optionally update UI with error message
    }
};


    const toggleForm = () => {
        setIsLogin(!isLogin);  // Toggle between forms
    };

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={isLogin ? handleLogin : handleSignup}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                {!isLogin && (
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                )}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <button onClick={toggleForm}>
                {isLogin ? 'Need to create an account?' : 'Already have an account?'}
            </button>
        </div>
    );
}

export default AuthPage;
