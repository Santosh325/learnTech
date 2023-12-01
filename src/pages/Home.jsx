import React from 'react'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
import {FaArrowRight} from 'react-icons/fa'
import CTAButton from '../components/core/Homepage/CTAButton'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import TimeLineSection from '../components/core/Homepage/TimeLineSection'
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection'
import InstructorSection from '../components/core/Homepage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/Homepage/ExploreMore'

import '../App.css'
function Home() {
  return (
    <div >

        {/* section 1 */}
        <div className='relative flex flex-col w-11/12 items-center text-white max-w-maxContent mx-auto justify-between'>
            <Link to={"/signup"}>

                <div className='shadow-md group mt-16 p-1 mx-auto bg-richblack-800 rounded-full font-bold text-black-200 transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row gap-x-2 items-center px-10 py-[5px] rounded-full group-hover:bg-richblack-900'>
                        <p>Become an Instructor </p><FaArrowRight/>
                    </div>
                </div>

            </Link>
            {/* Heading */}
            <div className='text-center text-semibold text-4xl mt-4'>
                Empower Your Future with 
                <HighlightText text={"Coding Skills"}/>
            </div>
            {/* Sub Heading  */}
            <div className='w-[90%] text-center font-semibold text-md text-richblack-300 mt-4 '>
            Become an Instructor
            Empower Your Future with Coding Skills
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            Learn More
            Book a Demo                
            </div>

            <div className='flex flex-row gap-6 mt-8 w-full  justify-center'>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
            </div>
            
            <div className='mx-3 my-12 shadow-sm'>
                <video
                muted
                loop
                autoPlay
                >
                    <source src={Banner} type='video/mp4' />
                </video>
            </div>

            {/* Code Section 1 */}
            <div>
                <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                    Unlock your 
                    <HighlightText text={"coding potential "}/>
                    with our online courses.
                    </div>
                }
                subHeading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {active:true, linkto:"/signup", btnText:"Become an Instructor"}
                
                }
                ctabtn2={
                    {active:false, linkto:"/login", btnText:"Learn More"}
                
                }

                codeblock={
                    ` <!DOCTYPE html>
                    <html>
                    <head>
                    <title>Example</title>
                    <link rel="stylesheet" href="styles.css"></head>
                    <body>
                    <h1><a href="/">Header</a></h1>
                    <nav><a href="one/">One</a>
                    <a href="two/">Two</a>
                    <a href="three/">Three</a></nav>                  
                    </html>
                    `
                }
                codeColor={"text-yellow-50"}
                />
            </div>

            {/* Code Section 1 */}
            <div>
                <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                    Starting 
                    <HighlightText text={"coding in Seconds "}/>
                    
                    </div>
                }
                subHeading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={
                    {active:true, linkto:"/signup", btnText:"Continue Lesson"}
                
                }
                ctabtn2={
                    {active:false, linkto:"/login", btnText:"Learn More"}
                
                }

                codeblock={
                    ` <!DOCTYPE html>
                    <html>
                    <head>
                    <title>Example</title>
                    <link rel="stylesheet" href="styles.css"></head>
                    <body>
                    <h1><a href="/">Header</a></h1>
                    <nav> <a href="one/">One</a>
                    <a href="two/">Two</a>
                    <a href="three/">Three</a></nav>
                    </html>
                    `
                }
                codeColor={"text-yellow-50"}
                />
            </div>
             
             {/* Power of Code */}
            <ExploreMore/>
        </div>

        
        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
           <div className='h-[310px] homepage_bg'>
              <div className='w-11/12 max-w-maxContent mx-auto items-center align-middle justify-between flex flex-col gap-5'>

                <div className='h-[150px]'></div>
                 <div className='flex flex-row gap-5  items-center'>
                   <CTAButton active={true} linkto={'/signup'}>
                    <div className='flex flex-row gap-4 items-center'>
                        Continue Lesson
                        <FaArrowRight/> 
                    </div>

                   </CTAButton>
                   <CTAButton active={false} linkto={'/login'}>
                    Learn More
                   </CTAButton>
                 </div>
              </div>
           </div>
           <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between mx-auto mb-10 mt-[60px]'>
              <div className='flex flex-row gap-6 my-12'>
                <div className='w-[45%] text-4xl font-bold'>
                  <h1>Get the skills you need for a <HighlightText text={"job that is in demand"}/>.</h1>
                </div>
                <div className='flex flex-col gap-6 w-[40%] text-[16px]'>
                 <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                 <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                </div>
               </div>
           </div>

           <TimeLineSection/>

           <LearningLanguageSection/>

        </div>

        {/* section 3 */}
        <div className='w-11/12 max-w-maxContent mx-auto flex-col items-center justify-between gap-8 bg-richblack-900 text-white '>
         <InstructorSection/>
         <h2 className='text-center text-4xl font-bold mt-10 text-richblack-200'>Reviews From Other Learners </h2>
         {/* Review Slider here */}

         
        </div>

        {/* section 4 */}

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Home