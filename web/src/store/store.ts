import {  createReducer, configureStore } from '@reduxjs/toolkit'
import * as actions from './actions'

import { UserData } from 'models/user'
import sagaMiddleWare, { saga } from './saga';

// state
interface State {
    token?: string;
    userData?: UserData;
}

let initState: State = {};


// 1.action


// 2.reducer
const reducer = createReducer(
    initState,
    builder => builder
        .addCase(actions.setToken, (state, action) => {
            return { ...state, token: action.payload.token }
        })
        .addCase(actions.clearToken, (state) => {
            let res = { ...state }
            delete res.token;
            return res;
        })
        .addCase(actions.setUserData, (state, action) => {
            return { ...state, userData: action.payload }
        })
);

// 3.store
const store = configureStore({
    reducer:reducer,
    middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(saga);

export default store;