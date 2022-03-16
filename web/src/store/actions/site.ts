import { createAction } from '@reduxjs/toolkit'
import { SubscribeData, TopicData } from 'models/site'

// subscribe
export const setAllSubscribeData = createAction<SubscribeData[]>('setAllSubscribeData')
export const getAllSubscribeData = createAction<void>('getAllSubscribeData')

// topic
export const setTopics = createAction<TopicData[]>('setTopics')
export const getTopics = createAction<void>('getTopics')
