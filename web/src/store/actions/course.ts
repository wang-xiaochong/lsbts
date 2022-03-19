import { createAction } from '@reduxjs/toolkit'

import { CourseSummaryData, SearchParams } from '@/models/course'

// index course
export const setIndexCourseSummary = createAction<{ category: number, data: CourseSummaryData[] }>('setIndexCourseSummary')
export const getIndexCourseSummary = createAction<number>('getIndexCourseSummary')


// search result
export const setSearchCourseResult = createAction<CourseSummaryData[]>('setSearchCourseResult')
export const getSearchCourse = createAction<SearchParams>('getSearchCourse')

