import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import styles from './sign_up.module.css';


const SignUpPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();


    console.log(fullName, email, password)
    const validateForm = (event) => {
        event.preventDefault();

        if (password.length < 8) {
            setPasswordError('Password should be at least 8 characters long');
            return;
        }
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                'Password must contain a mixture of numbers, alphabets, and special characters'
            );
            return;
        }
        setPasswordError('');

        const formData = {
            fullName,
            email,
            password,
        };
        // Here, you can save the formData to localStorage, send it to an API, or use any other method to store the data.

        // Redirect to the sign-in page
        navigate('/');
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <img src={logo} alt="Centered Image" />
            </div>
            <h1 className={styles.name}>GymShark</h1>

            <div className={styles.container2}>
                <h2>Sign Up</h2>
                <form onSubmit={validateForm}>
                    <label htmlFor="fullname">
                        <b>Full Name</b>
                    </label>
                    <br />
                    <input
                        type="text"
                        id="fullname"
                        placeholder="Enter your Full Name"
                        name="fullname"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <br />

                    <label htmlFor="email">
                        <b>Email Address</b>
                    </label>
                    <br />
                    <input type="email" id="email" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    />
                    <br />
                    <span className={styles.error}>{emailError}</span>

                    <label htmlFor="password">
                        <b>Password</b>
                    </label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <span className={styles.error}>{passwordError}</span>

                    <button className={styles.button} type="submit">
                        SIGN UP
                    </button>
                    <Link className={styles.Signin} to="/">
                        Sign-in!
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
