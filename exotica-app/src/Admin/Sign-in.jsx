import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Sign-in.css';

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (e) => {
    e.preventDefault();
    
    validateEmail(email);
    validatePassword(password);
    
    if (emailError || passwordError) {
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });
    
      const data = await response.json();
    
      if (response.ok) {
        console.log("User logged in successfully");
        const token = data.token;
        localStorage.clear();
        localStorage.setItem("token", token);
        navigate('/admin/dashboard');
      } else {
        console.log(data.message || 'User not logged in');
        alert(data.message || 'User not logged in');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while logging in');
    }
  };
  

  return (
    <>
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h3>LOGIN</h3>
            </div>
          </div>
          <form className="login-form" onSubmit={submit}>
            <input
              type="email"
              value={email}
              placeholder="username"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {emailError && <span className="error">{emailError}</span>}
            <div className="login-password">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              {passwordError && <span className="error">{passwordError}</span>}
              <div className="fav-icon">
                <i
                  className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </div>
            <button type="submit">login</button>
            <h1 className="message">
              <Link to="#">Forgot Your Password</Link>
            </h1>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
