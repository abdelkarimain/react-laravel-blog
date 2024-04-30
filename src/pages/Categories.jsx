import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts/topcategories/all');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error.message);
      setCategories([]);
      setLoading(false);

    }
  };

  const fetchPosts = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/bycategory/${category}/${0}`);
      const data = await response.json();
      return data.posts;
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPostsForCategories = async () => {
      setLoading(true);
      const postsForCategories = await Promise.all(categories.map(async (category) => {
        const postsForCategory = await fetchPosts(category.category);
        return { category: category.category, posts: postsForCategory };
      }));
      setPosts(postsForCategories);
      setLoading(false);
    };
    fetchPostsForCategories();
  }, [categories]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <main className="flex justify-center px-7 py-16 text-white dark:bg-gradient-to-br from-gray-800 to-gray-900 grow">
      <div className="container">
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-2xl font-bold text-slate-900 lg:text-6xl dark:text-gray-200'>All Categories</h1>
          <p className='text-gray-800 dark:text-gray-300 text-xl'>
            These are all our Categories. More coming soon.🔍🔍
          </p>
        </div>
        <ul className="space-y-16">
          {posts.map((categoryPosts, index) => (
            <li key={index}>
              <h2 className="text-blue-950 text-2xl font-semibold dark:text-blue-500">{categoryPosts.category}</h2>
              <ul className="grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
                {categoryPosts.posts.map((post) => (
                  <li key={post.id} className='truncate'>
                    <Link to={`/post/${post.slug}`} className="mb-2 text-gray-900 transition dark:text-gray-100 flex items-center justify-between gap-4 py-2 pl-4 pr-2 dark:bg-gray-600 dark:border-t dark:border-gray-600 shadow-lg group rounded-xl shadow-primary-800/10">
                      <div className=''>
                        <h3 className="font-medium capitalize">{post.title}</h3>
                        <p className="text-gray-900 text-xs transition group-hover:text-yellow-500 dark:text-gray-300 ">
                          {post && post.content.replace(/<[^>]*>/g, '')}
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-gray-500 transition group-hover:text-primary-400 shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Categories;
