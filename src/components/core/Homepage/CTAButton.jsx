import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({children, active, linkto}) {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[16px] px-6 py-3 rounded-md font-bold 
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"}
        transition-all duration-200 hover:scale-95 w-fit shadow-md
        `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton