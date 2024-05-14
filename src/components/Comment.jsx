import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Button, Dropdown, Textarea } from 'flowbite-react';

const Comment = ({ comment, onEdit, onDelete }) => {
    const { auth_token } = useSelector((state) => state.user || 'null');
    const { currentUser } = useSelector((state) => state.user);

    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    // fetch user based on comment's userId
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/comments/user/${comment.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${auth_token}`,
                    },
                }
                );
                const data = await res.json();
                if (res.ok) {
                    setUser(data.user);
                }
                if (!res.ok) {
                    console.log(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);


    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        if (!editedContent || editedContent.length > 200) return;
        try {

            const res = await fetch(`/api/comment/editComment/${comment.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='flex p-2 dark:bg-slate-800 bg-gray-100 mb-3 rounded-lg dark:border-gray-600 dark:text-teal-300'>
            <div className='flex-shrink-0 mr-3'>
                <img
                    className='w-10 h-10 rounded-full bg-gray-200'
                    src={user.image ? user.image : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                    alt={user.username === 'undefined' ? 'anonymous user' : user.username}
                />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>

                    <span className='font-bold mr-1 text-sm truncate'>
                        {user && user.username ? `@${user.username}` : ''}
                    </span>

                    {user.is_admin === 1 ?
                        (<span className='text-sm bg-green-500 font-bold rounded-lg px-1'>Admin</span>)
                        :
                        (<span className='text-sm bg-blue-500 font-bold rounded-lg px-1'>user</span>)
                    }

                    <span className='text-xs md:text-sm ml-3'>
                        {moment(comment.created_at).fromNow()}
                    </span>
                    <span className='text-xs hidden md:block text-slate-400 font-medium ml-6'>

                        {moment(comment.created_at).fromNow() === moment(comment.updated_at).fromNow() ? null :
                            'edited ' + moment(comment.updated_at).fromNow()
                        }
                    </span>
                </div>


                {isEditing ? (
                    <>
                        <Textarea
                            className='mb-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            maxLength='200'
                        />

                        <div className='flex justify-end gap-2 text-xs'>
                            <p className='text-gray-500 text-sm'>
                                {200 - editedContent.length} characters remaining
                            </p>
                            <Button
                                type='button'
                                size='sm'
                                gradientDuoTone='purpleToBlue'
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button
                                type='button'
                                size='sm'
                                gradientDuoTone='purpleToBlue'
                                outline
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <p className='dark:text-gray-300 p-2 text-sm break-all whitespace-pre-wrap'>{comment.content}</p>
                )}


            </div>
            <div className='flex-2 mr-2'>
                {currentUser &&
                    (currentUser.id == comment.user_id || currentUser.is_admin === 1) && !isEditing && (
                        <Dropdown label=" ••• " inline arrowIcon={false}>
                            <Dropdown.Item onClick={() => handleEdit()}>
                                <span className='text-sm bg-text-blue-500'>Edit</span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => onDelete(comment.id)} >
                                <span className='text-sm text-red-500'>Delete</span>
                            </Dropdown.Item>
                        </Dropdown>
                    )
                }
            </div>
        </div>
    )
}

export default Comment