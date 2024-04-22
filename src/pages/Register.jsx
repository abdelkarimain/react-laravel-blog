import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

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
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
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

