import { Button, FileInput, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoSparkles } from 'react-icons/io5';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { geminiApiKey, geminiApiPrompt, geminiApiUrl } from '../utils';
import { marked } from 'marked';

const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [aiContent, setAiContent] = useState(''); // For AI-generated content
  const [userContent, setUserContent] = useState(''); // For user input
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const { auth_token } = useSelector((state) => state.user || 'null');
  const [typingContent, setTypingContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
    ],
  };

  const handleUploadImage = () => {
    if (imageFile) {
      setImageFileUrl(URL.createObjectURL(imageFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = typingContent || userContent;

    if (!title || !content) {
      toast('Please add a title and content!', {
        icon: '👉',
      });
      return;
    }

    if (!imageFile) {
      toast('Please select an image!', {
        icon: '💾',
      });
      return;
    }

    if (content.length < 200) {
      toast('Content must be at least 200 characters', {
        icon: '👉',
      });
      return;
    }

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
          Authorization: `Bearer ${auth_token}`,
        },
      });
      if (response.ok) {
        toast.success('Post created successfully');
        setTitle('');
        setUserContent('');
        setCategory('');
        setImageFile(null);
        setImageFileUrl(null);
        setTypingContent(''); // Reset typing content as well
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  const handleAiGenerate = async () => {
    const text = userContent;

    try {
      const response = await fetch(geminiApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiApiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${geminiApiPrompt} ${text}`,
                },
              ],
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const markdownText = data.candidates[0].content.parts[0].text;
        const htmlText = marked(markdownText);
        setAiContent(htmlText);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.error?.message;
        toast.error(errorMessage || 'An unknown error occurred');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (aiContent) {
      // Simulate typing animation
      let index = 0;
      const timer = setInterval(() => {
        setTypingContent(aiContent.substring(0, index));
        index += 10;

        // Scroll to the bottom of the editor
        const editor = document.querySelector('.ql-editor');
        if (editor) {
          editor.scrollTop = editor.scrollHeight;
        }

        if (index > aiContent.length) {
          clearInterval(timer);
          setTypingContent(aiContent); // Ensure the final content is set
          setAiContent(''); // Clear AI content to allow user edits
        }
      }, 10); // Decreased interval to make it very fast

      return () => clearInterval(timer);
    }
  }, [aiContent]);

  return (
    <div className="p-3 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between p-5 text-center">
        <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
        <Link to="/dashboard?tab=posts">
          <Button gradientDuoTone="purpleToPink" className="align-center mt-6 mb-6">
            View Posts
          </Button>
        </Link>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            className="flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          <Button type="button" gradientDuoTone="purpleToBlue" size="sm" outline onClick={handleUploadImage}>
            Upload Image
          </Button>
        </div>
        {imageFileUrl && (
          <img src={imageFileUrl} alt="upload" className="w-full h-72 object-cover" />
        )}

        <div className="relative">
          <ReactQuill
            theme="snow"
            value={typingContent || userContent} // Use typingContent if present, otherwise use userContent
            onChange={setUserContent}
            modules={modules}
            placeholder="Write something cool..."
            className="h-[400px]"
            required
          />

          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            size="sm"
            className="absolute top-16 right-4 text-xs"
            onClick={handleAiGenerate}
          >
            Continue with AI <IoSparkles className="ml-2" />
          </Button>
        </div>

        <Button className="mt-24 mb-6" type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
