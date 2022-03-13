import { UserData } from "models/user";
import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions/index'
export interface UserState {
    token?: string;
    userData?: UserData;
}


export const initState:UserState = {}

export const userReducer = createReducer(
    initState,
    builder => builder
        .addCase(actions.user.setToken, (state, action) => {
            return { ...state, token: action.payload.token }
        })
        .addCase(actions.user.clearToken, (state) => {
            let res = { ...state }
            delete res.token;
            return res;
        })
        .addCase(actions.user.setUserData, (state, action) => {
            return { ...state, userData: action.payload }
        })
);