import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../images/logo-2.png'
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Button } from 'react-bootstrap';

const Register = () => {
    const { registerUser, error } = useAuth();
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState('')

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        registerUser(data?.email, data?.password, data?.username, history);
        if (data.password.length < 6) {
            setErrorMsg(<h6 className="text-white pink-bg py-1">Password must be at least 6 characters!</h6>)
        }
        else if (error) {
            setErrorMsg(<h6 className="text-white pink-bg py-1">Email already used</h6>)
        }
        else {
            setErrorMsg('')
        }
    };
    return (
        <div className="login-form">
            <div className="container py-5">
                <div className="text-center">
                    <img src={logo} alt="" className="w-25" />
                </div>
                <div className="container w-100">
                    <div className="form-container mx-auto rounded-3 px-5 py-5">
                        <h3>Welcome</h3>
                        <p>Register for an account using your preferred social network authentication</p>
                        {/* login form */}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="form-control" {...register("username", { required: true })} placeholder="Enter Your Name" />

                            <input type="email" className="form-control my-3" {...register("email", { required: true })} placeholder="Enter Your Email" />

                            <input type="password" className="form-control my-3" {...register("password", { required: true })} placeholder="Enter Your Password" />

                            <Button type="submit" variant="info" className="pink-btn w-100 mb-2">Register</Button>
                        </form>
                        <p>Already have an account? <Link to="/login" className="pink-text">Login</Link></p>
                        {errorMsg}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;