import React from 'react'
import CTAButton from './CTAButton'
import {FaArrowRight} from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation';
 

function CodeBlocks(
    {position, heading, subHeading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}
) {
  return (
    <div
    className={`flex ${position} gap-6 my-20 justify-between`}
    >

        {/* section 1 */}
        <div className='flex flex-col gap-4 w-[50%]'>
            {heading}
            <div className='text-richblack-300 font-bold mt-2'>
                {subHeading}
            </div>
            <div className='flex gap-6 mt-12'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-4 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/> 
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>{ctabtn2.btnText}</CTAButton>
            </div>
        </div>

        {/* section 2 code block*/}
       
        <div className='flex flex-row w-[100%] h-fit lg:w-[500px] '>
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
             <TypeAnimation
             sequence={[codeblock, 2000, ""]}
             cursor={true}
             repeat={Infinity}
             omitDeletionAnimation={true}
             style={{
                whiteSpace: "pre-line",
                fontSize: '16px', display: 'block' }}
             />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks