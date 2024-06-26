import { createAction } from '@reduxjs/toolkit'
import { UserCourseProgressData, UserCourseTabData, UserData, UserOrderData } from 'models/user';
import { SubscribeData } from 'models/site';
import { CourseChapterData } from 'models/course';


//token
export const setToken = createAction<{ token: string }>('setToken');
export const saveToken = createAction<{ token: string }>('saveToken');
export const restoreToken = createAction<void>('restoreToken');
export const clearToken = createAction<void>('clearToken')

// userdata
export const setUserData = createAction<UserData>('setUserData')
export const getUserData = createAction<void>('getUserData')

// subscribe
export const setMySubscribe = createAction<SubscribeData[]>('setMySubscribe')
export const getMySubscribe = createAction<void>('getMySubscribe')
export const submitMySubscribe = createAction<SubscribeData[]>('submitMySubscribe')
export const setMyCurSubscribe = createAction<number>('setMyCurSubscribe')

//progress
export const setMyProgressInfo = createAction<UserCourseProgressData>('setMyProgressInfo')
export const getMyProgressInfo = createAction<void>('getMyProgressInfo')

//courseList
export const setMyCourseList = createAction<UserCourseTabData[]>('setMyCourseList')
export const getMyCourseList = createAction<void>('getMyCourseList')


// user chapter progress
export const setMyChapters = createAction<CourseChapterData[]>('setMyChapters')
export const getMyChapters = createAction<number>('getMyChapters')

// my order
export const setMyOrder = createAction<UserOrderData[]>('setMyOrder')
export const getMyOrder = createAction<void>('getMyOrder')