import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState, 
    reducers: {
        setCourseSectionData: (state, action) => {
         state.courseSectionData = action.payload
        },
        setEntireCourseData: (state, action) => {
        state.courseEntireData = action.payload
        },
        setTotalNofOfLectures: (state, action) => {
        state.totalNoOfLectures = action.payload
        },
        setCompletedLectures: (state,action) => {
        state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
        state.completedLectures = [...state.completedLectures]
        }
    }
})


export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNofOfLectures,
    setCompletedLectures,
    updateCompletedLectures
} = viewCourseSlice.actions

export default viewCourseSlice.reducer