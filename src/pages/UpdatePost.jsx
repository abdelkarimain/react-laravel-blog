import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const UpdatePost = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('none');

    const { auth_token } = useSelector((state) => state.user || 'null');
    const { id } = useParams();


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


    // FETCH SINGLE POST 
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/findbyid/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${auth_token}`
                    }
                });
                const data = await res.json();
                if (!res.ok) {
                    console.log(data);
                    return;
                }
                if (res.ok) {
                    setImageFileUrl(data.image);
                    setTitle(data.title);
                    setCategory(data.category);
                    setContent(data.content);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchPost();
    }, [id]);


    const handleUploadImage = () => {
        if (imageFile) {
            setImageFileUrl(URL.createObjectURL(imageFile));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            toast('Please add a title and a content!', {
                icon: '👉',
            });
            return;
        }

        if (!imageFile && !imageFileUrl) {
            toast('Please select an image!', {
                icon: '💾',
            });
            return;
        }

        if (content.length < 200) {
            toast('content must be at least 200 characters', {
                icon: '👉',
            });
            return;
        }
        const newFormData = new FormData();

        newFormData.append('title', title);
        newFormData.append('content', content);
        newFormData.append('category', category);
        newFormData.append('image', imageFile);
        newFormData.append('method', 'PUT');


        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'POST',
                body: newFormData,
                headers: {
                    'Authorization': `Bearer ${auth_token}`
                }
            });
            if (response.ok) {
                toast.success('Post Updated successfully');
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
            <div className='flex justify-between p-5 text-center'>
                <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
                {/* <Link to='/dashboard?tab=posts'>
                    <Button gradientDuoTone='purpleToPink' className='align-center mt-6 mb-6'>View Posts</Button>
                </Link> */}
            </div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        id='title'
                        className='flex-1'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Select id='category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value='none'>Select a category</option>
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
                {/* {formData.image && ( */}
                <img
                    src={imageFileUrl}
                    alt='upload'
                    className='w-full h-72 object-cover'
                />
                {/* )} */}

                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={(e) => setContent(e)}
                    modules={modules}
                    placeholder="Enter Your Note Here..."
                    className=' h-[400px]'
                    required
                />

                <Button className=' mt-24 mb-6' type='submit' gradientDuoTone='purpleToPink'>
                    Update & Publish
                </Button>
            </form>
        </div>
    );
}

export default UpdatePost;