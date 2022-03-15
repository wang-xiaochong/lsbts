import { createAction } from '@reduxjs/toolkit'
import { UserData } from 'models/user';
import { SubscribeData } from 'models/site';


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
