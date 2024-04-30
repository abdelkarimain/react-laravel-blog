import { Modal, Table, Button, Pagination, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import moment from 'moment';

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { auth_token } = useSelector((state) => state.user || 'null');
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  const [tolalComments, setTotalComments] = useState(0);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const storedPage = localStorage.getItem('commentsCurrentPage');

    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    } else {
      setCurrentPage(1);
    }
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/getallcomments?page=${currentPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${auth_token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments.data);
          console.log('data', data.comments.data);
          console.log('comments', comments);
          setTotalComments(data.comments.total);
          setTotalPages(Math.ceil(data.comments.total / data.comments.per_page));
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    if (currentUser.is_admin) {
      fetchComments();
    }
  }, [currentPage, currentUser.is_admin, auth_token]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem('commentsCurrentPage', page);
  };


  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth_token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setComments(comments.filter((comment) => comment.id !== commentIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  if (loading) {
    return (
      <div className=' md:mx-auto flex justify-center items-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {/* top bar with add post */}
      <div className='flex justify-between items-center p-5'>
        <h1 className='font-semibold text-center'>Total Comments : {tolalComments}</h1>
      </div>

      {/* posts table */}
      {currentUser.is_admin && comments ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>created at</Table.HeadCell>
              <Table.HeadCell>updated at</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Post id</Table.HeadCell>
              <Table.HeadCell>User id</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>

            </Table.Head>
            {comments.map((comment) => (
              <Table.Body key={comment.id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(comment.created_at).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {moment(comment.updated_at).fromNow()}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {comment.content}
                  </Table.Cell>

                  <Table.Cell className='font-medium text-gray-900 dark:text-white'>{comment.post_id}</Table.Cell>

                  <Table.Cell>
                    {comment.user_id}
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment.id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </>


      ) : (
        <p>No Comments yet!</p>
      )
      }
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
              <Button color='failure' onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div >
  )
}

export default DashComments
