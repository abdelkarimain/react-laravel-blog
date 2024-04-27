import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const CommentSection = ({ postId }) => {
  const { auth_token } = useSelector((state) => state.user || 'null');
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  // create comment
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
        // After successful comment submission, fetch comments again to refresh the list
        fetchComments();
        setComment('');
        setCommentError(null);
      }

      if (!response.ok) {
        setCommentError(responseData.error);
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  // get comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/show/${postId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth_token}`,
        }
      });
      const data = await res.json();

      if (res.ok) {
        // console.log(data);
        setComments(data.comments);
      }

      if (!res.ok) {
        console.log(data);
      }

    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c.id === comment.id ? { ...c, content: editedContent } : c
      )
    );
  };
  // delete comment
  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth_token}`,
        }
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment.id !== commentId));
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

      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 px-2 rounded-lg'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      {/* delete modal message */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default CommentSection