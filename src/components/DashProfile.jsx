

import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const filePickerRef = useRef();




  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form  className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={currentUser.image}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-2 border-[lightgray]`}
          />
        </div>
        
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          
        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span  className='cursor-pointer'>
          Delete Account
        </span>
        <span className='cursor-pointer'>
          Sign Out
        </span>
      </div>
    </div>
  )
}

export default DashProfile

