import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa';
import { RiEye2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {
    const path = useLocation().pathname;
    const currentUser = useSelector((state) => state.user.currentUser || null);

    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    return (
        <>
            <Navbar className='border-b-2'>
                <Link
                    to='/'
                    className='self-center whitespace-nowrap sm:text-xl font-semibold dark:text-white'
                >
                    <span className='px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                        <span className='text-[#FFDD00] font-bold text-2xl px-1'>{"{"}</span>
                        AIN's BLOG
                        <span className='text-[#FFDD00] font-bold text-2xl px-1'>{"}"}</span>
                    </span>
                    {/* <span className='px-2 py-2 bg-gradient-to-r  rounded-lg text-slate-800 flex justify-center items-center'>
                        {/* <span className='text-[#FFDD00] font-bold text-4xl px-1'>{"{"}</span> */}
                        {/* <span>AIN</span>
                        <RiEye2Line className='text-4xl font-semibold from-indigo-500 via-purple-500 to-pink-500' />
                        <span>BLOG</span>
                        {/* <span className='text-[#FFDD00] font-bold text-4xl px-1'>{"}"}</span> */}
                    {/* </span>   */}

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
                            <Dropdown.Item >Sign out</Dropdown.Item>
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
                        <Link className='' to='/'>Home</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/about'} as={'div'}>
                        <Link className='' to='/about'>About</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/categories'} as={'div'}>
                        <Link className='' to='/categories'>Catrgories</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header