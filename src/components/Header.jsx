import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const path = useLocation().pathname;
    return (
        <>
            <Navbar className='border-b-2'>
                <Link
                    to='/'
                    className='self-center whitespace-nowrap sm:text-xl font-semibold dark:text-white'
                >
                    <span className='px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                        <span className='text-[#FFDD00] font-bold text-2xl px-1'>{"{"}</span>
                        Ain's Blog
                        <span className='text-[#FFDD00] font-bold text-2xl px-1'>{"}"}</span>
                    </span>

                </Link>
                
                <div className='flex gap-2 md:order-2'>
                    

                    <Link to='/login'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
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