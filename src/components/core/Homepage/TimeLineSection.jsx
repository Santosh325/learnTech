import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timeLineImage from '../../../assets/Images/TimelineImage.png'


function TimeLineSection() {

    const timeLine = [
        {
            Logo: Logo1,
            heading: "Leadership",
            description: "Fully committed to the success company"
        },
        {
            Logo: Logo2,
            heading: "Responsibility",
            description: "Students will always be our top priority"
        },
        {
            Logo: Logo3,
            heading: "Flexibility",
            description: "The ability to switch is an important skills"
        },
        {
            Logo: Logo4,
            heading: "Solve the problem",
            description: "Code your way to a solution"
        },

    ]
  return (
    <div>
      <div className='w-11/12 max-w-maxContent items-center justify-center mx-auto flex flex-row'>
       <div className='w-[40%] flex flex-col gap-5'>
        {
            timeLine.map((element, index) => {
                return (
                    <div key={index} className='flex flex-row gap-5'>
                        <div className='w-[50px] h-[50px] bg-white flex items-center justify-center'>
                        <img src={element.Logo} alt="" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[18px] font-semibold'>{element.heading}</h1>
                            <p>{element.description}</p>
                        </div>
                    </div>
                );
            })
        }
       </div>
       <div className='relative shadown-blue-200 mb-12  '>
         <img src={timeLineImage} alt="timelineimage" className='shadow-white object-cover'/>
         <div className='left-[50%] translate-x-[-50%] translate-y-[-50%] absolute  bg-caribbeangreen-700  flex flex-row text-white uppercase py-6 gap-6 '>
           <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
             <div className='text-3xl font-bold'>10</div>
             <div className='text-caribbeangreen-300 text-small'>Years of Experience</div>
           </div>
           <div className='flex flex-row gap-5 items-center px-7'>
           <div className='text-3xl font-bold'>250</div>
            <div className='text-caribbeangreen-300 text-small'>Types of Courses</div>
           </div>
         </div>
       </div>
      </div>
    </div>
  )
}

export default TimeLineSection