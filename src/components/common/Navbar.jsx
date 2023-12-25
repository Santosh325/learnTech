 import React, { useEffect } from 'react'
 import logo from "../../assets/Logo/Logo-Full-Light.png"
 import { Link, matchPath } from 'react-router-dom'
 import {NavbarLinks} from "../../data/navbar-links"
 import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
// import { useState } from 'react'
// import { apiConnector } from '../../services/apiConnector'
// import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from "react-icons/io";

const subLinks = [
  {
    title: "Python",
    path: "/catalog/python"
  }, 
  {
    title: "Web Development",
    path: "/catalog/web-development"
  }
]

 function Navbar() {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const location = useLocation();
    // const [subLinks, setSubLinks] = useState([]);

    // const fetchSublinks = async() => {
    //   try {
    //     const result = await apiConnector('GET', categories.CATEGORIES_API);
    //     console.log('printing Sublinks data: ', result)
    //     setSubLinks(result.data.data);
    //   } catch(error) {
    //     console.log(error);
    //     console.log('Could not fetch the Category link')
    //   }
    // }

    // useEffect(() => {
    //   fetchSublinks();
    // }, [])

    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname)
    }
    console.log("i am navbar page");
    console.log(token);
   
   return (
     <div className='flex h-14 text-center justify-between border-b-[1px] border-b-richblack-700'>
        <div className='w-11/12 flex max-w-maxContent items-center mx-auto justify-between'>
        {/* Image */}
         <Link to={"/"}>
             <img src={logo} alt="" className=' cursor-pointer w-[160px]  loading={lazy}'/>
         </Link>
       {/* Navlinks */}
         <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
               {
                NavbarLinks.map((link, index) => (
                    <li key={index}>
                        {
                            link.title === "Catalog" ? (
                            <div className='flex flex-row gap-2 items-center cursor-pointer relative group'>
                                 <p>{link.title}</p>
                                 <IoIosArrowDropdownCircle />
                                 <div className="invisible absolute left-[50%]
                                  translate-x-[-46%] translate-y-[33%]
                                  top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 
                                  text-richblack-900 opacity-0 transition-all duration-200
                                  group-hover:visible group-hover:opacity-100 lg:w-[300px]
                                  items-start
                                  ">
                                    <div className='absolute bg-richblack-5 rotate-45 rounded left-[50%] top-0 h-6 w-6 translate-y-[-45%] translate-x-[30%]'>
                    
                                    </div>
                                    {
                                      subLinks.length ? (
                                          subLinks.map((subLink, index) => (
                                            <Link to={subLink.path} key={index}>
                                              <p>{subLink.title}</p>              
                                            </Link>
                                          ))
                                          
                                      ) : (<div></div>)
                                    }
                                 </div>
                            </div>
                            ) : (
                            <Link to={link?.path}><p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-50"}`}>{link.title}</p>
                            </Link>
                            )
                        }
                    </li>
                ))
               }
            </ul> 
         </nav>
        
        {/* Login/signup/dashboard */}
         <div className='flex gap-x-4 items-center'>
            {
               user && user?.accountType !== "Instructor" && 
               (
                <Link to="dashboard/cart" className='relative'>
                  <AiOutlineShoppingCart/>
                  {
                    totalItems > 0 &&  (
                      <span>{totalItems}</span>
                    )
                  }
                  
                </Link>
               )
            }
            
            {
             
              token === null &&  (
                <Link to="/login">
                 <button className='border border-richblack-700 text-richblack-100 bg-richblack-800 px-[12px] py-[12px] rounded-md'>
                   Log In
                 </button>
                </Link>
              )
            }
            {
              token === null &&
               (
               <Link to="/signup">
              <button  className='border border-richblack-700 text-richblack-100 bg-richblack-800 px-[12px] py-[12px] rounded-md'>
                Sign Up
              </button>
              </Link>
              )
            }
            {
              token !== null && <ProfileDropDown/>
            }
            
         </div>
        </div>
     </div>
   )
 }
 
 export default Navbar