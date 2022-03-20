import { createAction } from '@reduxjs/toolkit'
import { CategoryData } from 'models/category'
import { SubscribeData, TopicData, LinkData } from 'models/site'

// category
export const setAllCategory = createAction<CategoryData[]>('setAllCategory')
export const getAllCategory = createAction<void>('getAllCategory')

// subscribe
export const setAllSubscribeData = createAction<SubscribeData[]>('setAllSubscribeData')
export const getAllSubscribeData = createAction<void>('getAllSubscribeData')

// topic
export const setTopics = createAction<TopicData[]>('setTopics')
export const getTopics = createAction<void>('getTopics')

// link
export const setSiteLink = createAction<LinkData[]>('setSiteLink')
export const getSiteLink = createAction<void>('getSiteLink')