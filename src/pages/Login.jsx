import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import loginSvg from '../assets/loginSvg.svg';
import logo from '../assets/logo.svg';

const Login = () => {
  const [formData, setFormData] = useState({});
  // const [validationErrors, setValidationErrors] = useState({});
  // const [loading, setLoading] = useState(false);
  const { loading, error: validationErrors } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginStart())

    try {
      const response = await fetch("/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const responseData = await response.json();

        dispatch(loginSuccess(responseData))
        console.info("Welcome back!");
        // console.info(responseData);
        navigate("/dashboard");

      } else {
        const errorData = await response.json();
        if (errorData) {
          // setValidationErrors(errorData);
          dispatch(loginFailure(errorData))
          console.info(errorData);
        } else {
          console.info("Registration failed.");
        }
      }
    } catch (error) {
      console.error("Network Error.");
    }

  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-10'>
        {/* left */}
        <div className='flex-1 text-center'>
          <img className='hidden md:block w-full' src={loginSvg} alt="" />
          <a href="https://ainblog.vercel.app" target='_blank' className="inline-flex items-center gap-3 text-xl font-bold">
            <div className="flex items-center justify-center w-11 h-11 rounded-lg">
              <img className="" src={logo} alt="" />
            </div>

            <span className='dark:text-slate-400'>Ain Blog Website</span>
          </a>
          <p className='text-sm mt-5'>
            You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <h1 className='text-3xl font-bold py-4 mb-6 text-center'>Sign In To Your Account</h1>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            {validationErrors && validationErrors.message && <Alert color="failure" className='text-sm' >{validationErrors.message}</Alert>}
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
              {validationErrors && validationErrors.email && (
                <p className='text-red-500 text-sm'>{validationErrors.email}</p>
              )}
            </div>

            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
              {validationErrors && validationErrors.password && (
                <p className='text-red-500 text-sm'>{validationErrors.password}</p>
              )}
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/register' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login