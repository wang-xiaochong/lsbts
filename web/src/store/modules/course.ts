
import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions/index'
import { CourseSummaryData, SearchCategoryData, SearchCourseResult } from '@/models/course'

export interface CourseState {
    indexCourseList: {
        [key: string]: CourseSummaryData[],
    };
    searchCourseResult: SearchCourseResult,
    //category
    searchCategoryData: SearchCategoryData[];

}

export const initState: CourseState = {
    indexCourseList: {},
    searchCourseResult: { total: 0, data: [] },
    searchCategoryData: [],
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
                searchCourseResult: action.payload,
            }
        })

        //category
        .addCase(actions.course.setSearchCategoryData, (state, { payload }) => {
            return { ...state, searchCategoryData: payload };
        })





);