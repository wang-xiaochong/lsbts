import { createAction } from '@reduxjs/toolkit'
import { AlertProps } from '../modules/app'


// alert
export const showAlert = createAction<AlertProps>('showAlert')
export const hideAlert = createAction<void>('hideAlert')

// search bar
export const setSearchBarKw = createAction<string>('setSearchBarKw')

// header footer
export const setHeaderVisible = createAction<boolean>('setHeaderVisible')
export const setFooterVisible = createAction<boolean>('setFooterVisible')