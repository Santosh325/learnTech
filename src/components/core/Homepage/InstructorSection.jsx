import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
function InstructorSection() {
  return (
    <div className='flex flex-row gap-20 items-center justify-between my-12'>
    <div className='w-[50%]'>
     <img src={Instructor} alt={"instructor"} className='shadow-white '/>
    </div>
    <div className='flex flex-col items-start gap-6  justify-start w-[40%]'>
      <div className='text-4xl font-semibold'>Become an <HighlightText text={"Instructor"}/></div>
      <div className='text-medium text-[16px] w-[90%] text-richblack-600'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
      <div className='mt-6 w-fit'>
          <CTAButton active={true} linkto={'/signup'}>
              <div className='flex items-center gap-2'>
                  Become an Instructor <FaArrowRight/> 
              </div>
          </CTAButton>
      </div>
    </div>
 </div>
  )
}

export default InstructorSection