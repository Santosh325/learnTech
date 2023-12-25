import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import OTPInput from 'react-otp-input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useEffect } from 'react';

function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const {signupData, loading} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!signupData) {
            navigate('/signup');
        }
    },[]);
    function handleOnSubmit(e) {
        e.preventDefault();
        const {accountType, firstName, lastName, email, password, confirmPassword} = signupData;
        dispatch(signUp( 
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
            ))
    }
  return (
    <div className='text-white flex items-center justify-center mt-[150px]'>
        {
          loading ? 
          (<div>Loading...</div>) 
          : (<div>
            <h1>Verify Email</h1>
            <p>A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={handleOnSubmit}>
                <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props}
                className=" bg-richblack-800 "
                />}
                />
                <button type='submit'>Verify Email</button>
            </form>
            <div className='flex flex-between'>
                <div>
                    <Link to="/login">
                     <p>Back to Login</p>
                    </Link>
                    </div>
                </div>
                <button onClick={() => dispatch(sendOtp(signupData.email,navigate))}>
                    Resend It
                </button>
            <div>
                </div>
          </div>)
        }
    </div>
  )
}

export default VerifyEmail