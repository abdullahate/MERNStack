import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import styles from './sign_in.module.css'
const SignInPage = () => {
    const navigate = useNavigate();

    const validateForm = (event) => {
        event.preventDefault();


        navigate('/Home');
    };

    return (
        <div className={styles.body}>

            <div className={styles.container}>
                <img src={logo} alt="Centered Image" />
            </div>
            <h1 className={styles.name}>GymShark</h1>


            <div className={styles.container2}>
                <h2>Sign in</h2>
                <form onSubmit={validateForm}>
                    <label htmlFor="email"><b>Email</b></label> <br />
                    <input type="email" id="email" placeholder="Enter your email" name="email" required /><br />

                    <label htmlFor="password"><b>Password</b></label> <br />
                    <input type="password" id="password" placeholder="Enter your password" name="password" required />
                    <br />

                    <button className={styles.forgot}>Forgot Password?</button>
                    <button className={styles.button} type="submit">SIGN IN</button>
                    <Link className={styles.Signup} to="/signup">Sign-up!</Link>
                </form>
            </div>
        </div>

    );
};

export default SignInPage;