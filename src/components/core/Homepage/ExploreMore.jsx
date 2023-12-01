import React, { useState } from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';
function ExploreMore() {
    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"

    ]

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
  
   const setMyCards = (value) => {
     setCurrentTab(value);
     const result = HomePageExplore.filter((course) => course.tag === value)
     setCourses(result[0].courses);
     setCurrentCard(result[0].courses[0].heading);
   }
  return (
    <div className='w-11/12 max-w-maxContent items-center justify-center mx-auto flex flex-row my-8'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-center text-4xl font-semibold'>Unlock the <HighlightText text={"Power of Code"}/></h1>
              <p className='text-center text-richblack-200'>Learn to Build Anything You Can Imagine</p>
              <div className='flex flex-row gap-2 px-4 py-2  bg-richblack-700 justify-between'>
                {tabsName.map((item,index)=>(
                    <div key={index} className={`text-16px flex flex-row items-center gap-2 rounded-full p-2
                    ${currentTab === item ? "bg-richblack-900 text-richblack-50 font-medium" : "text-richblack-200"} 
                    transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-50 px-7
                    `}
                    onClick={()=>setMyCards(item)}
                    >
                        {item}
                    </div>
                ))}
              </div>
              {/* Course card group */}
              <div className='absolute flex flex-row gap-10 justify-between w-full'>
                {
                  courses.map((element, index) => {
                    return (
                      <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                    );
                  })
                }
              </div>
            </div>
     </div>
  )
}

export default ExploreMore