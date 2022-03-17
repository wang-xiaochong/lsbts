
import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions/index'
import { CourseSummaryData } from '@/models/course'

export interface CourseState {
    indexCourseList: {
        [key: string]: CourseSummaryData[],
    };
}

export const initState: CourseState = {
    indexCourseList: {},
}

export const courseReducer = createReducer(
    initState,
    builder => builder
        // course
        .addCase(actions.course.setIndexCourseSummary, (state, action) => {
            const { category, data } = action.payload;
            return {
                ...state,
                indexCourseList: {
                    ...state.indexCourseList,
                    [category]: data
                }
            }

        })



);