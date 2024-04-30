import { Link } from 'react-router-dom';
import SmallAbout from '../components/SmallAbout';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import { Pagination, Spinner } from 'flowbite-react';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [top5categories, setTop5categories] = useState([]);
    const [category, setCategorie] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedPage = localStorage.getItem('allPostsCurrentPage');

        if (storedPage) {
            setCurrentPage(parseInt(storedPage));
        } else {
            setCurrentPage(1);
        }
        const fetchPosts = async () => {
            try {
                setLoading(true);
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
                    setLoading(false);
                }

                const data = await res.json();
                setPosts(data.posts.data);
                setTotalPages(data.posts.last_page);
                setLoading(false);

            } catch (error) {
                console.error(error.message);
                setPosts([]);
                setLoading(false);
            }
        };
        fetchPosts();
    }, [category, currentPage]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/posts/topcategories/7', {
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
        localStorage.setItem('allPostsCurrentPage', page);
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
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-4xl font-bold lg:text-5xl text-center md:text-start'>All Posts</h1>
                <p className='text-gray-800 dark:text-gray-300 text- text-center md:text-start'>
                    These are all our posts. Check them out and get inspired.💻
                </p>
            </div>
            <div className='mx-auto w-full max-w-2xl px-6 lg:max-w-7xl'>
                <div className="relative flex justify-center mb-5">
                    {/* Categories */}
                    <ul className="flex items-center gap-4 px-6 mb-2 overflow-x-auto whitespace-nowrap scrollbar
             scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
              dark:scrollbar-thumb-slate-500">
                        <li>
                            <a
                                className={`cursor-pointer inline-block border-2 text-xl font-semibold rounded-xl p-3
                 border-teal-500 ${category === 'all' ? 'bg-yellow-200 text-slate-950' : ''}`}
                                onClick={() => {
                                    localStorage.setItem('allPostsCurrentPage', 1);
                                    setCurrentPage(1);
                                    setCategorie('all');
                                }}>
                                All
                            </a>
                        </li>
                        {top5categories.map((cat, index) => (
                            <li key={index}>
                                <a
                                    className={`cursor-pointer inline-block border-2 rounded-xl p-3 text-xl font-semibold
                     border-teal-500 ${category === cat.category ? 'bg-yellow-200 text-slate-950' : ''}`}
                                    onClick={() => {
                                        localStorage.setItem('allPostsCurrentPage', 1);
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
                <div className="flex justify-center mt-4 mb-11">
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

export default AllPosts