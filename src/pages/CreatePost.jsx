import React, { useState } from "react";
import { Button, FileInput, Spinner, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { geminiApiKey, geminiApiPrompt, geminiApiUrl } from "../utils"; // Ensure you have these utils defined
import { IoSparkles } from "react-icons/io5";
import { marked } from "marked";

const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { auth_token } = useSelector((state) => state.user || "null");

  // Quill Editor
  const Font = ReactQuill.Quill.import("formats/font");
  Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida",
  ];
  ReactQuill.Quill.register(Font, true);

  // Editor config
  const modules = {
    toolbar: [
      [
        // { font: Font.whitelist },
        { size: [] },
      ],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast("Please add a title and content!", {
        icon: "👉",
      });
      return;
    }

    if (!imageFile) {
      toast("Please select an image!", {
        icon: "💾",
      });
      return;
    }

    if (content.length < 200) {
      toast("Content must be at least 200 characters", {
        icon: "👉",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
      if (response.ok) {
        toast.success("Post created successfully");
        setTitle("");
        setContent("");
        setCategory("");
        setImageFile(null);
        setImageFileUrl(null);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleAiGenerate = async () => {
    const text = content;
    setIsAiLoading(true);

    try {
      const response = await fetch(geminiApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": geminiApiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
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
        setContent(marked(markdownText));
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.error?.message;
        toast.error(errorMessage || "An unknown error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between p-5 text-center">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create a post
        </h1>
        <Link to="/dashboard?tab=posts">
          <Button
            gradientDuoTone="purpleToPink"
            className="align-center mt-6 mb-6"
          >
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
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
          >
            Upload Image
          </Button>
        </div>
        {imageFileUrl && (
          <img
            src={imageFileUrl}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <div className="relative">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Write something cool..."
            className="h-[400px]"
            required
          />
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            size="sm"
            className="absolute top-20 right-7 text-xs"
            onClick={handleAiGenerate}
            disabled={isAiLoading}
          >
            {isAiLoading ? (
              <span className="flex text-sm items-center gap-2 p-0">
                <Spinner size="sm" /> Generating... <IoSparkles className="ml-2" />
              </span>
            ) : (
              <>
                Continue with AI <IoSparkles className="ml-2" />
              </>
            )}
          </Button>
        </div>

        <Button
          className="mt-24 mb-6"
          type="submit"
          gradientDuoTone="purpleToPink"
        >
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
