import React from 'react'
import HighlightText from '../Homepage/HighlightText'

function Qoute() {
  return (
    <div className=''>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text={"combines technology"}/>
        <span className='text-brown-500 '>
            {" "}
            expertise
        </span>
        ,  and community to create an
        <span className=' text-brown-200'>
            {" "}
            unparalleled educational experience
        </span>
    </div>
  )
}

export default Qoute