import { createAction } from '@reduxjs/toolkit'
import { SubscribeData } from 'models/site'

export const setAllSubscribeData = createAction<SubscribeData[]>('setAllSubscribeData')
export const getAllSubscribeData = createAction<void>('getAllSubscribeData')