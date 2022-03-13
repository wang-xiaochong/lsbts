import { createAction } from '@reduxjs/toolkit'
import { SubscribeData } from 'models/site'

export const setSubscribeData = createAction<SubscribeData[]>('setSubscribeData')
export const getSubscribeData = createAction<void>('getSubscribeData')