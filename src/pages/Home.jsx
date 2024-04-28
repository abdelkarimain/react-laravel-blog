import { Link } from 'react-router-dom';
import SmallAbout from '../components/SmallAbout';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedPage = localStorage.getItem('homeCurrentPage');

    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    } else {
      setCurrentPage(1);
    }
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts/all?page=${currentPage}` , {
          method: 'GET',
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts.data);
          setTotalPages(data.posts.last_page);
          // setTotalPages(Math.ceil(data.posts.total / data.posts.per_page));
        }
      } catch (error) {
        console.log(error.message);
        setPosts([]);
      }
    };
    fetchPosts();
  }, [currentPage]);


  const onPageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem('homeCurrentPage', page);
  };

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <SmallAbout />
      </div>

      {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts?.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div> */}
      <div className='mx-auto w-full max-w-2xl px-6 lg:max-w-7xl my-10 mb-20'>
        <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>

        <div className='mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-3'>
          {posts &&
            posts.map((post) =>
              <PostCard key={post.id} post={post} />
            )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
            nextLabel='Next'
            previousLabel='Prev'
          />
        </div>

      </div>
    </div>
  );
}

export default Home

