import { UserData } from "models/user";
import { createReducer } from '@reduxjs/toolkit'
import { CategoryData } from "models/category";
import actions from '../actions/index'
export interface UserState {
    token?: string;
    userData?: UserData;
    mySubscribe?: CategoryData[],
}


export const initState: UserState = {}

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
);