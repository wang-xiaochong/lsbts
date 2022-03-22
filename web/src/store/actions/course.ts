import { createAction } from '@reduxjs/toolkit'

import { AdCourseData, CourseSummaryData, SearchCategoryData, SearchCourseResult, SearchParams } from '@/models/course'

// index course
export const setIndexCourseSummary = createAction<{ category: number, data: CourseSummaryData[] }>('setIndexCourseSummary')
export const getIndexCourseSummary = createAction<number>('getIndexCourseSummary')


// search result
export const setSearchCourseResult = createAction<SearchCourseResult>('setSearchCourseResult')
export const getSearchCourse = createAction<SearchParams>('getSearchCourse')

// search category
export const setSearchCategoryData = createAction<SearchCategoryData[]>('setSearchCategoryData');
export const getSearchCategoryData = createAction<{
  category: number, category_level: number
}>('getSearchCategoryData');

// ad
export const setAdList = createAction<{ type: 'right' | 'bottom', data: AdCourseData[] }>('setAdList')
export const getAdList = createAction<'right' | 'bottom'>('getAdList')