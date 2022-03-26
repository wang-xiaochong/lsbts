import { createAction } from '@reduxjs/toolkit'

import { AdCourseData, CourseDetail, CourseSummaryData, SearchCategoryData, SearchCourseResult, SearchParams, VideoSectionData } from '@/models/course'

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

// course registed
export const setCourseRegisted = createAction<boolean>('setCourseRegisted')
export const getCourseRegisted = createAction<number>('getCourseRegisted')

// course detail
export const setCourseDetail = createAction<CourseDetail>('setCourseDetail');
export const getCourseDetail = createAction<number>('getCourseDetail')

//video section
export const setVideoSectionData = createAction<VideoSectionData>('setVideoSectionData');
export const getVideoSectionData = createAction<number>('getVideoSectionData');

//course register
export const registerCourse = createAction<number>('registerCourse')

//course add progress
export const addMyProgress = createAction<number>('addProgress')