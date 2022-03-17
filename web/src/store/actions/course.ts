import { createAction } from '@reduxjs/toolkit'

import { CourseSummaryData } from '@/models/course'


export const setIndexCourseSummary = createAction<{ category: number, data: CourseSummaryData[] }>('setIndexCourseSummary')
export const getIndexCourseSummary = createAction<number>('getIndexCourseSummary')