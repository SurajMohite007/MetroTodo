import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import loginSchema from './validation/LoginValidation';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
    const navigate = useNavigate();
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (!agreeTerms) {
            return; 
        }

        const { error } = loginSchema.validate(formData, { abortEarly: false });
        if (error) {
            const validationErrors = error.details.reduce((errorsObj, errorItem) => {
                return {
                    ...errorsObj,
                    [errorItem.path[0]]: errorItem.message,
                };
            }, {});
            setErrors(validationErrors);
        } else {
            setErrors({});

            axios.post("http://localhost:5000/user/login", formData, { withCredentials: true }).then((response) => {
                if (response.data.result === "Success") {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    navigate('/app');
                } else {
                    alert("No such record exists!");
                }
            }).catch((err) => console.error(err.message));
        }
    };

    return (
        <div className='login-background'> 
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter Email'
                            className='form-control rounded-0'
                        />
                        {errors.email && <div className='error-message'>* {errors.email}</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter Password'
                            className='form-control rounded-0'
                        />
                        {errors.password && <div className='error-message'>* {errors.password}</div>}
                    </div>
                    <div className='mb-3 ml-4'>
                        <input
                            type='checkbox'
                            id='agreeTerms'
                            name='agreeTerms'
                            checked={agreeTerms}
                            onChange={handleCheckboxChange}
                            className='form-check-input'
                        />
                        <label htmlFor='agreeTerms' className='form-check-label'>
                            I agree to the Terms and Conditions
                        </label>
                        {!agreeTerms && submitAttempted && <div className='error-message'>Please agree to the Terms and Conditions.</div>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Log In</button>
                    
                    <Link to="/signup" className='btn btn-default border mt-2 w-100 bg-light text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
