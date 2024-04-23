import { Button, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSuccess, updateFailure, updateStart, deleteSuccess, logoutSuccess } from '../redux/user/userSlice';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const { auth_token } = useSelector((state) => state.user || 'null');

  const filePickerRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState(
    {
      username: currentUser?.username,
      name: currentUser?.name,
      password: '',
      password_confirmation: '',
      image: imageFile
    }
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart())
    const newData = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      newData.append(key, value)
    }

    try {
      const response = await fetch('/api/auth/update', {
        method: 'POST',
        body: newData,
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth_token}`
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
        dispatch(updateSuccess(responseData))
        toast.success('Successfully Updated!', {
          style: {
            fontSize: '3px'
          }
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Something went wrong.")
        dispatch(updateFailure(errorData));
        return;
      }
    } catch (error) {
      console.log('An error occurred during registration:', error);
    }
  };

  const handleDelete = async () => {
    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    // If user confirms the delete action
    if (result.isConfirmed) {
      try {
        const response = await fetch('/api/auth/delete', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${auth_token}`
          }
        });

        if (response.ok) {
          dispatch(deleteSuccess());
          const responseData = await response.json();
          console.log('Response:', responseData);
          toast.success('Deleted Successfully!', {
            style: {
              fontSize: '3px'
            }
          });
        } else {
          const errorData = await response.json();
          console.log('Response:', errorData);
          toast.error("Something went wrong.");
        }
      } catch (error) {
        console.log('An error occurred during registration:', error);
      }
    }
  };



  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> {/* Added onSubmit handler */}
        <input
          type='file'
          accept='image/*'
          ref={filePickerRef}
          onChange={handleImageChange}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser?.image}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-2 border-[lightgray]`}
          />
        </div>

        <TextInput
          type='text'
          name='name'
          placeholder='name'
          value={formData.name}
          onChange={handleInputChange}
        />
        {error && <p className='text-red-500 text-sm'>{error.name}</p>}

        <TextInput
          type='text'
          name='username'
          placeholder='username'
          value={formData.username}
          onChange={handleInputChange}
        />
        {error && <p className='text-red-500 text-sm'>{error.username}</p>}

        <TextInput
          type='password'
          name='password'
          placeholder='password'
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <p className='text-red-500 text-sm'>{error.password}</p>}
        <TextInput
          type='password'
          name='password_confirmation'
          placeholder='password confirmation'
          value={formData.password_confirmation}
          onChange={handleInputChange}
        />
        {error && <p className='text-red-500 text-sm'>{error.password_confirmation}</p>}

        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={handleDelete}>Delete Account</span>
        <span className='cursor-pointer' onClick={() => dispatch(logoutSuccess())}>Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
