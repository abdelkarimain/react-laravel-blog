import { Link } from 'react-router-dom';
import SmallAbout from '../components/SmallAbout';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import { Pagination, Spinner } from 'flowbite-react';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [top5categories, setTop5categories] = useState([]);
  const [category, setCategorie] = useState('all');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedPage = localStorage.getItem('homeCurrentPage');

    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    } else {
      setCurrentPage(1);
    }
    const fetchPosts = async () => {
      try {
        const apiLink = category === 'all'
          ? `/api/posts/all?page=${currentPage}`
          : `/api/posts/bycategory/${category}?page=${currentPage}`
        const res = await fetch(apiLink,
          {
            method: 'GET',
          }

        );

        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await res.json();
        setPosts(data.posts.data);
        setTotalPages(data.posts.last_page);
      } catch (error) {
        console.error(error.message);
        setPosts([]);
      }
    };
    fetchPosts();
  }, [category, currentPage]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/posts/topcategories/5', {
          method: 'GET',
        });
        const data = await res.json();
        if (res.ok) {
          setTop5categories(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setTop5categories([]);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);


  const onPageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem('homeCurrentPage', page);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-800 dark:text-gray-300 text-sm sm:text-xl'>
          Here you'll find a variety of articles and tutorials on topics such as web development,
          software engineering, and programming languages. Explore the latest trends,
          dive into new technologies! 🚀✨💻
        </p>

        <Link
          to='/all-posts'
          className='text-xs sm:text-lg text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <SmallAbout />

      </div>
      <div className='mx-auto w-full max-w-2xl px-6 lg:max-w-7xl my-10 mb-20'>
        <div className="relative flex justify-center mb-5">

          {/* Categories */}
          <ul className="flex items-center gap-4 py-4 px-6 -mt-4 overflow-x-auto whitespace-nowrap scrollbar
           scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
            dark:scrollbar-thumb-slate-500">
            <li>
              <a
                className={`cursor-pointer inline-block border-2 rounded-xl p-4 text-sm font-medium
               border-teal-500 ${category === 'all' ? 'bg-white text-slate-950' : ''}`}
                onClick={() => {
                  localStorage.setItem('homeCurrentPage', 1);
                  setCurrentPage(1);
                  setCategorie('all');
                }}>
                All
              </a>
            </li>
            {top5categories.map((cat, index) => (
              <li key={index}>
                <a
                  className={`cursor-pointer inline-block border-2 rounded-xl p-4 text-sm font-medium border-teal-500 ${category === cat.category ? 'bg-white text-slate-950' : ''}`}
                  onClick={() => {
                    localStorage.setItem('homeCurrentPage', 1);
                    setCurrentPage(1);
                    setCategorie(cat.category);
                  }}>
                  {cat.category}
                </a>
              </li>
            ))}
          </ul>

        </div>

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

        <div className="flex justify-center mt-11">
          <Link
            to={'/all-posts'}
            className='text-xl text-slate-500 font-bold hover:underline text-center'
          >
            View all posts
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home

