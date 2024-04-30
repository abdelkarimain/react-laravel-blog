import { Modal, Table, Button, Pagination, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const { auth_token } = useSelector((state) => state.user || 'null');
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [tolalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const storedPage = localStorage.getItem('postsCurrentPage');

    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    } else {
      setCurrentPage(1); // Default to page 1 if no stored value is found
    }
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts?page=${currentPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${auth_token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts.data);
          setTotalPosts(data.posts.total);
          setTotalPages(Math.ceil(data.posts.total / data.posts.per_page));
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    if (currentUser.is_admin) {
      fetchPosts();
    }
  }, [currentPage, currentUser.is_admin, auth_token]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem('postsCurrentPage', page);
  };


  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${postIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth_token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setUserPosts(userPosts.filter((post) => post.id !== postIdToDelete));
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
        <Link to='/create-post'>
          <Button gradientDuoTone='purpleToPink' className='mt-6 mb-6'>Add New Post</Button>
        </Link>

        <h1 className='font-semibold text-center'>Total Posts : {tolalPosts}</h1>
      </div>

      {/* posts table */}
      {currentUser.is_admin && userPosts?.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>updated</Table.HeadCell>
              <Table.HeadCell>Cover</Table.HeadCell>
              <Table.HeadCell>title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post.id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updated_at).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post.id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-green-500 hover:underline'
                      to={`/update-post/${post.id}`}
                    >
                      <span>Edit</span>
                    </Link>
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
        <p>You have no posts yet!</p>
      )}
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
              Are you sure you want to delete this post?
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

    </div>
  );
}