import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CommentSection = ({ postId }) => {
  const { auth_token } = useSelector((state) => state.user || 'null');
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200 || comment.length === 0) {
      return;
    }

    try {
      const response = await fetch(`/api/comment/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`,
        },
        body: JSON.stringify({
          post_id: postId,
          content: comment,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setComment('');
        setCommentError(null);
      }

      if (!response.ok) {
        // console.log(responseData);
        setCommentError(responseData.error);
      }

    } catch (error) {
      console.log(error.message);
    }

  };

  return (

    <div className='max-w-4xl mx-auto w-full text-lg p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500'>
          <p>Signed in as:</p>
          <img
            className='h-8 w-8 object-cover rounded-full'
            src={currentUser.image}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='2'
            maxLength='200'
            className='resize-none'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-sm'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {
            commentError === '' && (
              <span className='mt-5 text-red-500 text-sm'>
                {commentError}
              </span>
            )}
        </form>
      )}
    </div>
  )
}

export default CommentSection