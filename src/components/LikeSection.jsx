import React, { useState, useEffect } from 'react';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const LikeSection = ({ postId }) => {
    const [like, setLike] = useState(false);
    const [disLike, setDislike] = useState(false);
    const [nbLikes, setNbLikes] = useState(0);
    const [nbDisLikes, setNbDisLikes] = useState(0);
    const { auth_token, currentUser } = useSelector((state) => state.user || 'null');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch initial like status and counts
        fetchLikeStatus();
        fetchLikeDislikeCounts();
    }, []);

    const fetchLikeStatus = async () => {
        try {
            const response = await fetch(`/api/like-status/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth_token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch like status');
            }
            if (response.ok) {
                const data = await response.json();
                if (data.reaction_status === 'like') {
                    setLike(true);
                } else if (data.reaction_status === 'dislike') {
                    setDislike(true);
                }
                else {
                    setLike(false);
                    setDislike(false);
                }
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const fetchLikeDislikeCounts = async () => {
        try {
            const response = await fetch(`/api/likes/${postId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch like/dislike counts');
            }

            if (response.ok) {
                const data = await response.json();
                setNbLikes(data.like_count);
                setNbDisLikes(data.dislike_count);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleLikeClick = async () => {
        if (!auth_token || !currentUser) {
            navigate('/login');
            return;
        }
        try {
            const response = await fetch('/api/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`
                },
                body: JSON.stringify({
                    post_id: postId,
                    type: 'like'
                })
            });
            if (!response.ok) {
                throw new Error('Failed to save like');
            }
            const data = await response.json();
            if (data.status === 200) {
                setLike(!like);
                if (like) {
                    setNbLikes(nbLikes - 1);
                } else {
                    setNbLikes(nbLikes + 1);
                    if (disLike) {
                        setDislike(false);
                        setNbDisLikes(nbDisLikes - 1);
                    }
                }
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDislikeClick = async () => {
        if (!auth_token || !currentUser) {
            navigate('/login');
            return;
        }
        try {
            const response = await fetch('/api/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`
                },
                body: JSON.stringify({
                    post_id: postId,
                    type: 'dislike'
                })
            });
            if (!response.ok) {
                throw new Error('Failed to save dislike');
            }
            const data = await response.json();
            if (data.status === 200) {
                setDislike(!disLike);
                if (disLike) {
                    setNbDisLikes(nbDisLikes - 1);
                } else {
                    setNbDisLikes(nbDisLikes + 1);
                    if (like) {
                        setLike(false);
                        setNbLikes(nbLikes - 1);
                    }
                }
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="flex justify-center items-center gap-6">
            <button
                onClick={handleLikeClick}
                className={`flex justify-center items-center rounded-full bg-transparent px-4 py-2 ${like ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}`}
            >
                <FaRegThumbsUp className='text-2xl w-6 mr-3' /> <span>{nbLikes}</span>
            </button>
            <button
                onClick={handleDislikeClick}
                className={`flex justify-center items-center rounded-full bg-transparent px-4 py-2 ${disLike ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}`}
            >
                <FaRegThumbsDown className='text-2xl w-6 mr-3' /> <span>{nbDisLikes}</span>
            </button>
        </div>
    );
};

export default LikeSection;
