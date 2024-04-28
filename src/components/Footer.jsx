import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import logo from '../assets/logo.svg';
import send from '../assets/send.svg';

const FooterCompo = () => {
  return (
    <>
      <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full flex justify-center max-w-7xl mx-auto'>
          <div className="container relative flex flex-col items-center max-w-xl">
            <a href="https://ainblog.vercel.app" target='_blank' className="inline-flex items-center gap-3 text-xl font-bold">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg ">
                <img className="" src={logo} alt="" />
              </div>

              <span>Ain Blog Website</span>
            </a>

            <form onSubmit={(e) => e.preventDefault()} target="_blank" className="mt-16 space-y-2">
              <label className="inline-block text-sm font-medium text-gray-300">
                Subscribe for 20+ new web tutorials every week
              </label>

              <div className="relative flex items-center">
                <input type="email" placeholder="E-mail address"
                  className="py-3 pl-4 pr-12 text-sm transition
                         bg-gray-700 border-0 border-t border-b rounded-lg
                          placeholder:text-gray-400 focus:border-transparent
                           focus:ring-2 focus:ring-primary-500 grow
                            border-t-gray-600 border-b-transparent" />

                <button className="absolute flex items-center p-2 justify-center w-8 h-8 text-white rounded-md shadow-lg right-2 shadow-primary-700/30 border-y border-t-primary-400 border-b-primary-800 bg-gradient-to-b from-primary-500 to-primary-600">
                  <img src={send} alt="send icon" />
                </button>
              </div>

              <div id="mce-responses">
                <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
              </div>

              <p className="text-xs text-gray-400">
                You can unsubscribe at any time. You'll also get -20% off my courses!
              </p>

              <div style={{ position: 'absolute', left: '-5000px' }} >
                <input tabindex="-1" type="text" value="" />
              </div>
            </form>


            <ul className="flex flex-wrap items-center justify-center gap-4 mt-16">
              {/* <li>
                        <a className="inline-flex items-center gap-2 px-4 py-2 font-medium transition rounded-xl hover:bg-gray-800" href="https://www.youtube.com/c/LaravelDaily">
                            <svg className="w-5 h-5 text-[#FF0000]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"></path>
                            </svg>
                            <span>YouTube</span>
                        </a>
                    </li> */}

              <li>
                <a className="inline-flex items-center gap-2 px-4 py-2 font-medium transition rounded-xl hover:bg-gray-800"
                  target='_blank' href="https://twitter.com/ainabdelkarim">
                  <svg className="w-5 h-5 text-[#1DA1F2]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                  </svg>
                  <span>Twitter</span>
                </a>
              </li>

              <li>
                <a className="inline-flex items-center gap-2 px-4 py-1 font-medium transition rounded-xl hover:bg-gray-800" target='_blank' href="https://github.com/abdelkarimain0">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
              </li>
            </ul>

            <p className="mt-11 text-sm text-gray-400">© {new Date().getFullYear()} Ain web blog
              <span className="px-2">•</span>
              <Link to="/about" className="underline text-sm">About my blog</Link>
            </p>
          </div>
        </div>
      </Footer>
    </>
  )
}

export default FooterCompo