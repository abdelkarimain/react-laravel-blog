import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import registerSvg from '../assets/register-svg.svg';
import logo from '../assets/logo.svg';

const Register = () => {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (response.ok) {
        setLoading(true);
        setValidationErrors({});
        navigate("/login");
      }

      else {
        if (responseData) {
          setValidationErrors(responseData);
        }
        else {
          console.log(responseData || "Registration failed.");
        }
      }
    } catch (error) {
      console.log("An error occurred during registration.");
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1 text-center'>
          <img className='hidden md:block md:w-full' src={registerSvg} alt="" />
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
        <h1 className='text-3xl font-bold py-4 mb-6 text-center'>Create a New Account</h1>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

            {/* name */}
            <div>
              <Label value='Your name' />
              <TextInput
                type='text'
                placeholder='Full Name'
                id='name'
                onChange={handleChange}
              />
              {validationErrors.name && (
                <p className='text-red-500 text-sm'>{validationErrors.name}</p>
              )}
            </div>

            {/* email */}
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
              {validationErrors.email && (
                <p className='text-red-500 text-sm'>{validationErrors.email}</p>
              )}
            </div>

            {/* password */}
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
              {validationErrors.password && (
                <p className='text-red-500 text-sm'>{validationErrors.password}</p>
              )}
            </div>

            {/* confirm password */}
            <div>
              <Label value='Confirm your password' />
              <TextInput
                type='password'
                placeholder='Confirm Password'
                id='password_confirmation'
                onChange={handleChange}
              />
              {validationErrors.password_confirmation && (
                <p className='text-red-500 text-sm'>
                  {validationErrors.password_confirmation}
                </p>
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
                'Sign Up'
              )}
            </Button>
              <OAuth />
          </form>

          {/* have an account */}
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/login' className='text-blue-500'>
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register

