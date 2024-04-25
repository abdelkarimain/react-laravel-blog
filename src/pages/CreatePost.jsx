import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const { auth_token } = useSelector((state) => state.user || 'null');


  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
    ],
  };

  const handleUploadImage = () => {
    if (imageFile) {
      setImageFileUrl(URL.createObjectURL(imageFile));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('image', imageFile);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth_token}`
        }
      });
      if (response.ok) {
        toast.success('Post created successfully');
        setTitle('');
        setContent('');
        setCategory('');
        setImageFile(null);
        setImageFileUrl(null);
      } else {
        const errorData = await response.json();
        alert(errorData.message);

      }

    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  }

  return (
    <div className='p-3 max-w-4xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option selected value='none'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
          
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
          >
            Upload Image
          </Button>

        </div>
        {imageFileUrl && (
          <img
            src={imageFileUrl}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Enter Your Note Here..."
          className=' h-[400px]'
          required
        />

        <Button className=' mt-24 mb-6' type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
      </form>
    </div>
  )
}

export default CreatePost


