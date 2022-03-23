
import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions/index'
import { AdCourseData, CourseDetail, CourseSummaryData, SearchCategoryData, SearchCourseResult } from '@/models/course'

export interface CourseState {
    indexCourseList: {
        [key: string]: CourseSummaryData[],
    };
    searchCourseResult: SearchCourseResult,
    //category
    searchCategoryData: SearchCategoryData[];

    //ad
    rightAdList?: AdCourseData[];
    bottomAdList?: AdCourseData[];
    courseDetail?: CourseDetail;


}

export const initState: CourseState = {
    indexCourseList: {},
    searchCourseResult: { total: 0, data: [] },
    searchCategoryData: [],
    rightAdList: undefined,
    bottomAdList: undefined,
    courseDetail: undefined,
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

        //ad
        .addCase(actions.course.setAdList, (state, { payload: { type, data } }) => {
            if (type === 'right')
                return { ...state, rightAdList: data }
            if (type === 'bottom')
                return { ...state, bottomAdList: data }
        })

        // course detail
        .addCase(actions.course.setCourseDetail, (state, { payload }) => {
            return { ...state, courseDetail: payload }
        })




);