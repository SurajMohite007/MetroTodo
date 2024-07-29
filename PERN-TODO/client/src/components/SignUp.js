import React, { useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import signUpSchema from './validation/SignUpValidation';
import axios from 'axios'
import './SignUp.css'

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false); 

    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (!agreeTerms) {
            return; 
        }

        const { error } = signUpSchema.validate(formData, { abortEarly: false });

        if (error) {
            const validationErrors = error.details.reduce((errorsObj, errorItem) => {
                return {
                    ...errorsObj,
                    [errorItem.path[0]]: errorItem.message,
                };
            }, {});
            setErrors(validationErrors);
        } else {
            
            console.log('Form submitted:', formData);
            axios.post("/user",formData,{ withCredentials: true }).then((response)=>{
              console.log(response);
              navigate('/');
            }).catch((err) => console.error(err.message));


           
        }
    };

    return (

        <div className='signup-background'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter Name'
                            className='form-control rounded-0'
                        />
                        {errors.name && <span className='error-message'>* {errors.name}</span>}
                    </div>
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
                        {errors.email && <span className='error-message'>* {errors.email}</span>}
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
                        {errors.password && <span className='error-message'>* {errors.password}</span>}
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
                        {!agreeTerms && submitAttempted && <div className='error-message'>*Please agree to the Terms and Conditions.</div>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Sign Up</button>
                    <Link to="/" className='btn btn-default border mt-2 w-100 bg-light text-decoration-none'>Login</Link>
                </form>
            </div>
            </div>
        
    );
};

export default SignUp;