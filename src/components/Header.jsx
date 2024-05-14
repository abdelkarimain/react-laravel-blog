import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa';
import { RiEye2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { toggleTheme } from '../redux/theme/themeSlice';
import { logoutSuccess } from '../redux/user/userSlice';
import { BiSearch, BiX } from 'react-icons/bi';

const Header = () => {
    const path = useLocation().pathname;
    const currentUser = useSelector((state) => state.user.currentUser || null);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const [showSearchModal, setShowSearchModal] = useState(false);

    const [input, setInput] = useState('');
    const [postsListDefault, setPostsListDefault] = useState();
    const [postsList, setPostsList] = useState();


    const updateInput = async (input) => {
        const filtered = postsListDefault.filter(post => {
            return post.title.toLowerCase().includes(input.toLowerCase().trim()) ||
                post.content.toLowerCase().includes(input.toLowerCase().trim()) ||
                post.category.toLowerCase().includes(input.toLowerCase().trim())
        })
        setInput(input);
        setPostsList(filtered);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const apiLink = `/api/posts/allnopaginate`
                const res = await fetch(apiLink,
                    {
                        method: 'GET',
                    }

                );

                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await res.json();
                setPostsList(data.posts);
                setPostsListDefault(data.posts);
            } catch (error) {
                console.error(error.message);
                setPostsList([]);
                setPostsListDefault([]);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Navbar className='border-b-2 dark:bg-gradient-to-b from-gray-800 to-gray-900 bg-slate-100 text-gray-700'>
                <Link
                    to='/'
                    className='self-center whitespace-nowrap sm:text-xl font-semibold dark:text-white '
                >
                    <span className='rounded-lg text-white flex justify-center'>
                        <svg className='w-20 h-16 rounded-lg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" fill="#007ACC" />
                            <path d="M13.4881 6.44591C13.8882 6.55311 14.1256 6.96437 14.0184 7.36447L11.4302 17.0237C11.323 17.4238 10.9117 17.6613 10.5116 17.5541C10.1115 17.4468 9.8741 17.0356 9.98131 16.6355L12.5695 6.97624C12.6767 6.57614 13.088 6.3387 13.4881 6.44591Z" fill={theme === 'dark' ? '#fff' : "#000"} />
                            <path d="M14.9697 8.46967C15.2626 8.17678 15.7374 8.17678 16.0303 8.46967L16.2387 8.67801C16.874 9.3133 17.4038 9.84308 17.7678 10.3202C18.1521 10.8238 18.4216 11.3559 18.4216 12C18.4216 12.6441 18.1521 13.1762 17.7678 13.6798C17.4038 14.1569 16.874 14.6867 16.2387 15.322L16.0303 15.5303C15.7374 15.8232 15.2626 15.8232 14.9697 15.5303C14.6768 15.2374 14.6768 14.7626 14.9697 14.4697L15.1412 14.2981C15.8229 13.6164 16.2797 13.1574 16.5753 12.7699C16.8577 12.3998 16.9216 12.1843 16.9216 12C16.9216 11.8157 16.8577 11.6002 16.5753 11.2301C16.2797 10.8426 15.8229 10.3836 15.1412 9.70191L14.9697 9.53033C14.6768 9.23744 14.6768 8.76257 14.9697 8.46967Z" fill={theme === 'dark' ? '#fff' : "#000"} />
                            <path d="M7.96986 8.46967C8.26275 8.17678 8.73762 8.17678 9.03052 8.46967C9.32341 8.76257 9.32341 9.23744 9.03052 9.53033L8.85894 9.70191C8.17729 10.3836 7.72052 10.8426 7.42488 11.2301C7.14245 11.6002 7.07861 11.8157 7.07861 12C7.07861 12.1843 7.14245 12.3998 7.42488 12.7699C7.72052 13.1574 8.17729 13.6164 8.85894 14.2981L9.03052 14.4697C9.32341 14.7626 9.32341 15.2374 9.03052 15.5303C8.73762 15.8232 8.26275 15.8232 7.96986 15.5303L7.76151 15.322C7.12617 14.6867 6.59638 14.1569 6.23235 13.6798C5.84811 13.1762 5.57861 12.6441 5.57861 12C5.57861 11.3559 5.84811 10.8238 6.23235 10.3202C6.59638 9.84308 7.12617 9.31331 7.76151 8.67801L7.96986 8.46967Z" fill={theme === 'dark' ? '#fff' : "#000"} />
                        </svg>
                    </span>
                </Link>

                <div className='flex gap-2 md:order-2'>
                    <Button
                        className="bg-gray-200 border-2 border-gray-300 cursor-pointer me-7" pill
                        color='gray'
                        onClick={() => {
                            setShowSearchModal(!showSearchModal);
                            setInput('');
                        }}
                    >
                        {showSearchModal ? <BiX className='text-xl dark:text-white text-slate-800' /> : <BiSearch className='text-xl dark:text-white text-slate-800' />}
                    </Button>
                    {/* theme switch */}
                    <Button
                        className='hidden sm:inline bg-gray-200 border-2 border-gray-300'
                        color='gray'
                        pill
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {theme === 'light' ? <FaMoon className='text-xl' /> : <FaSun className='text-xl' />}
                    </Button>



                    {/* profile dorpdown */}
                    {currentUser ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt='user' img={currentUser.image} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className='block text-sm font-medium truncate'>
                                    {currentUser.email}
                                </span>
                            </Dropdown.Header>
                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => dispatch(logoutSuccess())}>Sign out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/register'>
                            <Button className='bg-gray-200' gradientDuoTone='purpleToBlue' >
                                Sign In
                            </Button>
                        </Link>
                    )}

                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        <Link className='' to='/'>
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/all-posts'} as={'div'}>
                        <Link className='' to='/all-posts'>
                            All Posts
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/categories'} as={'div'}>
                        <Link className='' to='/categories'>All Categories</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/about'} as={'div'}>
                        <Link className='' to='/about'>About</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/contact'} as={'div'}>
                        <Link className='' to='/contact'>Contact</Link>
                    </Navbar.Link>
                    <Navbar.Link className='md:hidden' as={'div'}>
                        {/* theme switch */}
                        <Button
                            className='sm:inline bg-gray-200 border-2 border-gray-300'
                            color='gray'
                            onClick={() => dispatch(toggleTheme())}
                        >
                            {
                                theme === 'light' ? <><FaMoon className='text-lg me-1' /> Dark</>
                                    :
                                    <><FaSun className='text-lg me-1' /> Light</>
                            }
                        </Button>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
            <div className='w-full'>
                <div className={showSearchModal ? "absolute self-center left-1/2 shadow-xl transform -translate-x-1/2  min-w-[300px] max-w-[300px] md:min-w-[400px] md:max-w-[400px] xl:min-w-[800px] xl:max-w-[800px] h-[200px] z-50 bg-white dark:bg-slate-600 px-6 overflow-y-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500" : "hidden"} id="search-content">
                    <div className="container mx-auto py-4 text-black">
                        <input value={input} onChange={(e) => updateInput(e.target.value)} type="search" placeholder="Search..." autoFocus className="dark:bg-gray-700 dark:text-gray-50 w-full text-grey-800 transition focus:outline-none focus:border-transparent px-3 appearance-none leading-normal text-xl lg:text-2xl" />
                    </div>
                    <div>
                        {input && postsList && postsList.length > 0 ? postsList.map((post) => (

                            <p className="container mx-auto text-black border-b-4 px-4" key={post.id}>
                                <Link
                                    to={'/post/' + post.slug}
                                    className="flex gap-4 py-5 dark:text-gray-50 w-full  text-grey-800 transition focus:outline-none focus:border-transparent px-3 appearance-none leading-normal text-xl lg:text-2xl"
                                    onClick={() => {
                                        updateInput('');
                                        setShowSearchModal(false);
                                    }}
                                >
                                    <img src={post.image} className='w-20 h-11' alt="" />
                                    <span className='font-bold break-all whitespace-pre-wrap'>{post.title}
                                        <br />
                                        <span className='text-sm bg-slate-400 px-2 py-1'>{post.category}</span>
                                    </span>

                                </Link>
                            </p>
                        ))

                            :
                            <p className="container mx-auto border-b-4 px-4">
                                <span className='font-bold'>No results</span>
                            </p>
                        }

                        {/* Add more links or content here */}
                    </div>
                </div>
            </div>


        </>
    )
}

export default Header