import { createAction } from '@reduxjs/toolkit'
import { UserData } from 'models/user';



export const setToken = createAction<{ token: string }>('setToken');
export const saveToken = createAction<{ token: string }>('saveToken');
export const restoreToken = createAction<void>('restoreToken');
export const clearToken = createAction<void>('clearToken')
export const setUserData = createAction<UserData>('setUserData')
