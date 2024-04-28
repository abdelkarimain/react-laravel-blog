import { Modal, Table, Button, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { auth_token } = useSelector((state) => state.user || 'null');
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [tolalUsers, setTotalUsers] = useState(0);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const storedPage = localStorage.getItem('usersCurrentPage');

    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    } else {
      setCurrentPage(1);
    }
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users?page=${currentPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${auth_token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users.data);
          console.log('data', data.users.data);
          console.log('Users', users);
          setTotalUsers(data.users.total);
          setTotalPages(Math.ceil(data.users.total / data.users.per_page));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.is_admin) {
      fetchUsers();
    }
  }, [currentPage, currentUser.is_admin, auth_token]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem('usersCurrentPage', page);
  };


  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/${userIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth_token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== userIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {console.info(users)}
      {/* top bar with add post */}
      <div className='flex justify-between items-center p-5'>
        <h1 className='font-semibold text-center'>Total Users : {tolalUsers}</h1>
      </div>

      {/* posts table */}
      {currentUser.is_admin && users ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>updated</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>IS-Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              
            </Table.Head>
            {users.map((user) => (
              <Table.Body key={user.id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(user.updated_at).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Link to={`/post/${user.}`}> */}
                    <img
                      src={user.image}
                      alt={user.name}
                      className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                    />
                    {/* </Link> */}
                  </Table.Cell>
                  <Table.Cell className='font-medium text-gray-900 dark:text-white'>{user.username}</Table.Cell>
                  <Table.Cell>
                    {user.email}
                  </Table.Cell>

                  <Table.Cell className='grid justify-center'>
                    {user.is_admin ? (
                      <span className='text-green-500 self-center text-center'> ✅ </span>
                      // <FaCheck className='' />
                    ) : (
                      <span className='text-red-500 self-center text-center'> ❌ </span>
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user.id);
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
        <p>There are no users yet!</p>
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
              Are you sure you want to delete this user?
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
  )
}

export default DashUsers
