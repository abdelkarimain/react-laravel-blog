import React from 'react'
import aboutsvg from '../assets/about2.svg'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-7xl mx-auto p-3 text-center'>
        <div>

          <div className='flex flex-col-reverse  md:flex-row'>
            <div className='flex-1 text-gray-700 dark:text-gray-400 flex flex-col gap-6 text-start md:text-center'>
              <h1 className='text-3xl  dark:text-white font font-bold text-center my-7'>
                About My Blog Website
              </h1>
              <p className='text-xl'>
                Welcome to my Web Blog! This blog was created by Abdelkarim Ain
                as a personal & school project to share his thoughts and ideas with the
                world. I'm a passionate developer who loves to write about
                technology, coding, and everything in between.
              </p>

              <p className='text-xl'>
                On this blog, you'll find weekly articles and tutorials on topics
                such as web development, software engineering, and programming
                languages. I'm always learning and exploring new
                technologies, so be sure to check back often for new content!
              </p>

              <p className='text-xl'>
                We encourage you to leave comments on our posts and engage with
                other readers. You can comment to other people's posts and reply to
                them as well. We believe that a community of learners can help
                each other grow and improve.
              </p>
            </div>
            <div className='p-7 flex-1'>
              <img src={aboutsvg} alt="about svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About