import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import "./Login.css";
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
// import MenuBar from '../../Header/MenuBar/MenuBar';


const Login = () => {
    const { loginUser, error } = useAuth()
    const history = useHistory();
    const location = useLocation();
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        loginUser(data?.email, data?.password, location, history);
    };
    return (
        <div className="login-form">
            {/* <MenuBar /> */}
            <div className="container py-5">
                <div className="text-center">
                    {/* <h1>YOODA HOSTEL</h1> */}
                </div>
                <div className="container w-100">
                    <div className="form-container mx-auto rounded-3 px-5 py-5">
                        <h3>Welcome Back!</h3>
                        <p>Login to your account using your preferred social network authentication</p>
                        {/* login form */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="email" className="form-control" {...register("email", { required: true })} placeholder="Enter Your Email" />

                            <input type="password" className="form-control my-3" {...register("password", { required: true })} placeholder="Enter Your Password" />
                            <button type="submit" className="pink-btn w-100 mb-2">Log In</button>
                        </form>
                        <p>Don’t have an account? <Link to="/register" className="pink-text">Create Account</Link></p>
                        {error ? <p className="pink-bg text-white py-1" >Incorrect email or password!</p> : <p></p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
