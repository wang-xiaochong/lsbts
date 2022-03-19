
import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions/index'
import { CourseSummaryData } from '@/models/course'

export interface CourseState {
    indexCourseList: {
        [key: string]: CourseSummaryData[],
    };
    searchCourseList: CourseSummaryData[]

}

export const initState: CourseState = {
    indexCourseList: {},
    searchCourseList: [],
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

        // search result
        .addCase(actions.course.setSearchCourseResult, (state, action) => {
            return {
                ...state,
                searchCourseList: action.payload,
            }
        })

      



);