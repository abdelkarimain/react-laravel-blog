import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa';
import { RiEye2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { toggleTheme } from '../redux/theme/themeSlice';
import { logoutSuccess } from '../redux/user/userSlice';

const Header = () => {
    const path = useLocation().pathname;
    const currentUser = useSelector((state) => state.user.currentUser || null);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    return (
        <>
            <Navbar className='border-b-2 dark:bg-gradient-to-b from-gray-800 to-gray-900'>
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
                    {/* theme switch */}
                    <Button
                        className='w-12 h-10 hidden sm:inline rounded-full'
                        color='gray'
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {theme === 'light' ? <FaMoon className='text-xl' /> : <FaSun className='w-5 h-5' />}
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
                            <Button gradientDuoTone='purpleToBlue' outline>
                                Sign In
                            </Button>
                        </Link>
                    )}

                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        {/* <Link className='' to='/'>
                            Home
                        </Link> */}
                    </Navbar.Link>
                    <Navbar.Link active={path === '/about'} as={'div'}>
                        <Link className='' to='/about'>About</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/categories'} as={'div'}>
                        <Link className='' to='/categories'>All Categories</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header