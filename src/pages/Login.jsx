import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

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
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Sahand's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>

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