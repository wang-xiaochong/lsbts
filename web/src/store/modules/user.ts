import { UserCourseProgressData, UserCourseTabData, UserData } from "models/user";
import { createReducer } from '@reduxjs/toolkit'
import { CategoryData } from "models/category";
import actions from '../actions/index'
import { CourseChapterData } from "models/course";
export interface UserState {
    token?: string;
    userData?: UserData;
    mySubscribe?: CategoryData[],
    myCurSubscribe?: number,
    myProgressInfo?: UserCourseProgressData,
    myCourseList?: UserCourseTabData[],
    myChapters?: CourseChapterData[],
}


export const initState: UserState = { myCurSubscribe: 0 }

export const userReducer = createReducer(
    initState,
    builder => builder
        // token
        .addCase(actions.user.setToken, (state, action) => {
            return { ...state, token: action.payload.token }
        })
        .addCase(actions.user.clearToken, (state) => {
            let res = { ...state }
            delete res.token;
            return res;
        })

        // userdata
        .addCase(actions.user.setUserData, (state, action) => {
            return { ...state, userData: action.payload }
        })

        // subscribe
        .addCase(actions.user.setMySubscribe, (state, action) => {
            return { ...state, mySubscribe: action.payload }
        })
        .addCase(actions.user.setMyCurSubscribe, (state, action) => {
            return { ...state, myCurSubscribe: action.payload }
        })
        // progressInfo
        .addCase(actions.user.setMyProgressInfo, (state, { payload }) => {
            return { ...state, myProgressInfo: payload }
        })
        //courseList
        .addCase(actions.user.setMyCourseList, (state, { payload }) => {
            return { ...state, myCourseList: payload }
        })
        //chapters
        .addCase(actions.user.setMyChapters, (state, { payload }) => {
            return { ...state, myChapters: payload }
        })
);