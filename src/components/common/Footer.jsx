import React from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin  } from 'react-icons/fa'
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]
const Resources = [
    "Articles",
    "Blog",
    "ChartSheet",
    "Code Challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces"
];

const Plans = ["Paid memberships", "For students", "Business solutions "];
const Community = ["Forums", "Chapters", "Events"]
const Company = ["About us", "Careers", "Affiliates"]
const Subjects = ["AI", "Cloud Computing", "Code Foundations", "Computer Science",
 "Cyber Security", "Data Analytics", "Data Science", "Data Visualization", "Developer Tools",
 "DevOps", "Game Development", "IT", "Maching Learning", "Math", "Mobile Development", "Web design", "Web Development"
]
const Languages = [
    "Bash", "C", "C++", "C#", "CSS", "Go", "HTML", "Java", "JavaScript", "Kotlin", "PHP", "Python", "Ruby", "SQL", "Swift"
]
const CarrerBuilding = [
    "Career Paths", "Career Services", "Career Tips", "Career Advice", "Career Resources"
]
function Footer() {
  return (
    <div className='w-11/12 max-w-maxContent items-center justify-center mx-auto my-8 '>
      <div className='flex flex-row items-start justify-between '>
         {/* Company  */}
        
         <div className='flex flex-col gap-1'>
            <img src={Logo} alt="logo" className='mb-4 fill-red-500'/>
            <h1 className='text-richblack-200 text-xl font-bold'>Company</h1>
            {
                Company.map((item,index) => {
                    return (
                        <div key={index} className='text-richblack-600 text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                            {item}
                            </div>
                    )
                })
            }
            {/* Company logo */}
            <div className='flex gap-6 text-richblack-200 mt-4'>
             <FaFacebook/>
             <FaInstagram/>
             <FaTwitter/>
             <FaLinkedin/>
            </div>
         </div>
         {/* Resources */}
         <div className='flex flex-col gap-1'>
           <h1 className='text-richblack-200 text-xl font-bold'>Resources</h1>
           {
            Resources.map((item,index) => {
                return(
                    <div key={index} className='text-richblack-600 text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                        {item}
                        </div>
                )
            })
           }
           {/* Support */}
           <h1 className='text-richblack-200 text-xl font-bold mt-4'>Support</h1>
           <p className='text-richblack-600 flex flex-col font-normal text-sm'>Help Center</p>
         </div>
         {/* Plans and Community */}
         <div className='flex flex-col gap-1'>
            {/* Plans */}
           <h1 className='text-richblack-200 text-xl font-bold'>Plans</h1>
           {
            Plans.map((item,index) => {
                return(
                    <div key={index} className='text-richblack-600 text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                        {item}
                        </div>
                )
            })
           }
           {/* Community */}
           <h1 className='text-richblack-200 text-xl font-bold mt-4'>Community</h1>
           {
            Community.map((item,index) => {
                return(
                    <div key={index} className='text-richblack-600 text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                        {item}
                        </div>
                )
            })
           }
         </div>
           {/* Subjects*/}
           <div className='flex flex-col gap-1'>
            {/* Subjects */}
           <h1 className='text-richblack-200 text-xl font-bold'>Subjects</h1>
           {
            Subjects.map((item,index) => {
                return(
                    <div key={index} className='text-richblack-600 text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                        {item}
                        </div>
                )
            })
           }
           
         </div>

         {/* Languages*/}
         <div className='flex flex-col gap-1'>
            {/* Subjects */}
           <h1 className='text-richblack-200 text-xl font-bold'>Languages</h1>
           {
            Languages.map((item,index) => {
                return(
                    <div key={index} className='text-richblack-600 text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                        {item}
                        </div>
                )
            })
           }
           
         </div>

          {/* Career Building*/}
          <div className='flex flex-col gap-1'>
            {/* Subjects */}
           <h1 className='text-richblack-200 text-xl font-bold'>Career Building</h1>
           {
            CarrerBuilding.map((item,index) => {
                return(
                    <div key={index} className='text-richblack-600 text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                        {item}
                        </div>
                )
            })
           }
           
         </div>
         
      </div>

      <div className='border-t border-richblack-600 my-8'></div>

      <div className='flex flex-row justify-between'>
        <div className='flex text-richblack-600 gap-4 text-sm font-normal '>
        
        {
          BottomFooter.map((item, index) => {
            return (
              <p key={index} className={`${BottomFooter.length - 1 === index ? "" : "border-r border-richblack-600 cursor-pointer pr-3 hover:text-richblack-50 transition-all"}`}>{item}</p>
            ) 
          })
        }
        </div>
        <div className='flex text-richblack-600 gap-4 text-sm font-normal'>
           Developed By Santosh Thapa ♥ © 2023 LearnTech
        </div>
      </div>
    </div>
  )
}

export default Footer