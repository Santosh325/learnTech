import React from 'react'
import HighlightText from './HighlightText'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import planYourLessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from './CTAButton';
function LearningLanguageSection() {
    return (
        <div className='w-11/12 max-w-maxContent items-center justify-center mx-auto mt-[150px] '>
            <div  className='flex flex-col gap-5 items-center'>
             {/* heading and subheading */}
             <div className='text-4xl font-semibold text-center'>
                Your Swiss knife for <HighlightText text={"Learning any Language"}/>
             </div>
             <div className=' text-richblack-600  text-center mx-auto font-medium text-base w-[60%]'>
             Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
             </div>

             {/* images */}
             <div className='flex flex-row items-center mt-8 '>
                <img src={knowYourProgress} alt='knowYourProgress' className='object-contain -mr-32'/>
                <img src={compareWithOthers} alt="compareWithOthers" className='object-contain'/>
                <img src={planYourLessons} alt='planYourLessons' className='object-contain -ml-32'/>
             </div>
            
            {/* CtaButton */}
            <div className='mb-10'>
            <CTAButton active={true} >Learn More </CTAButton>
            </div>
            

            </div>
        </div>
      )
}

export default LearningLanguageSection