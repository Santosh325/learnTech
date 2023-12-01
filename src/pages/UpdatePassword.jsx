import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import  {React } from 'react'
import { useSelector } from 'react-redux'
import {resetPassword} from "../services/operations/authAPI"
import { AiFillEyeInvisible ,AiFillEye  } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function UpdatePassword() {
    const [formData, setFormData] = useState({
      password: '',
      confirmPassword: '',
    })
    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector((state) => state.auth);
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const {password, confirmPassword} = formData;
    const token = location.pathname.split('/').at(-1)

    
    const handleOnChange = (e) => {
     setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name] : e.target.value
      }
     ))
    }

    const handleOnSubmit = (e) => {
      e.preventDefault();
      dispatch(resetPassword(password,confirmPassword,token))
    }
  return (
    <div className='text-white'>
        {
            loading ?
            (<div className='spinner'></div>) : 
            (<div>
               <div>
                <h1>Choose new Password</h1>
                <p>Almost done. Enter your new password and youre all set.</p>
                <form onSubmit={handleOnSubmit}>
                  <label>
                    New Password <sup>*</sup>
                    <input
                    required
                    type={showPassword ? "text" : "password"}
                    name='password'
                    value={password}
                    onChange={handleOnChange}
                    placeholder='Enter password'
                    className='text-black'
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)}>
                      {
                        showPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>
                      }
                    </span>
                  </label>
                  <label>
                   Confirm New Password <sup>*</sup>
                    <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder='Confirm password'
                    className='text-black'
                    />
                    <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      {
                        showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>
                      }
                    </span>
                  </label>
                  <button type='submit'>
                    Reset Password
                  </button>
                </form>
                <div>
                  <Link to="/login">
                    <p>Back to Login</p>
                  </Link>
                  </div>
                </div>
            </div>)
        }
    </div>
  )
}

export default UpdatePassword