import { useState } from 'react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

function ForgotPassword() {
    const {loading} = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }
  return (
    <div className='text-white flex justify-center items-center mx-auto'>
      {
        loading ? (<div className='spinner'></div>) : 
        (<div className='flex flex-col  mx-auto justify-center items-start gap-y-3 w-[60%] '>
          <h1 className='text-3xl'>
            {
                !emailSent ? " Reset Your Password " : " Check Your Email"
            }
          </h1>
          <p> 
            {
                !emailSent ? 
                "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : 
                `We have sent the reset email to ${email}`
            
            }
          </p>
          <form onSubmit={handleOnSubmit}>
             {
                !emailSent && (
                    <label>
                        <p>Email Address<sup color='red'>*</sup></p>
                        <input
                        required
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'       
                                      
                        />
                    </label>
                )
             }
             <br/>
             <button 
             className='bg-yellow-50 text-black mt-2'
             type='submit'>
                {
                    !emailSent ? "Reset Password" : "Resend Email"
                }
             </button>
          </form>
          <div>
            <Link to="/login">
                <p>Back to Login</p>
            </Link>
            </div>
        </div>
        )
      }
    </div>
  )
}

export default ForgotPassword