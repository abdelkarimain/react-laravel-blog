import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <>
            <section className="py-8 rounded-t-[8rem]">
                <div className="container">
                    <header className="flex flex-col items-center text-center">
                        <h2 className="text-xl font-bold tracking-tight md:text-2xl">The full tutorials is only for Premium Members</h2>

                        <div className="mt-5">
                            <Link to="/login" className="mt-8 bg-[#377DF4] p-2 rounded-md mr-3">
                                Login
                            </Link>
                            Or
                            <Link to="/login" className="mt-8 bg-[#377DF4] p-2 rounded-md ml-3">
                                Become a Premium Member for $129/year or $29/month
                            </Link>
                        </div>

                        <div className="grid gap-2 mt-6">
                            <div className="font-bold">What else you will get:</div>

                            <ul className="flex flex-col gap-2">
                                <li className="inline-flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path>
                                    </svg>            <span>59 courses (1056 lessons, total 42 h 44 min)</span>
                                </li>
                                <li className="inline-flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path>
                                    </svg>            <span>78 long-form tutorials (one new every week)</span>
                                </li>
                                <li className="inline-flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path>
                                    </svg>            <span>access to project repositories</span>
                                </li>
                                <li className="inline-flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path>
                                    </svg>            <span>access to private Discord</span>
                                </li>
                            </ul>
                        </div>
                    </header>
                </div>
            </section>
        </>
    )
}

export default CallToAction