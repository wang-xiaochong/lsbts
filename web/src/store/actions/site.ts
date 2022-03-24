import { createAction } from '@reduxjs/toolkit'
import { CategoryData } from 'models/category'
import { SearchResult } from 'models/search'
import { SubscribeData, TopicData, LinkData } from 'models/site'

// category
export const setAllCategory = createAction<CategoryData[]>('setAllCategory')
export const getAllCategory = createAction<void>('getAllCategory')

//search
export const setHotKeywords = createAction<SearchResult>('setHotKeywords');
export const getHotKeywords = createAction<void>('getHotKeywords');

export const setSuggest = createAction<SearchResult | undefined>('setSuggest');
export const getSuggest = createAction<string>('getSuggest');

// subscribe
export const setAllSubscribeData = createAction<SubscribeData[]>('setAllSubscribeData')
export const getAllSubscribeData = createAction<void>('getAllSubscribeData')

// topic
export const setTopics = createAction<TopicData[]>('setTopics')
export const getTopics = createAction<void>('getTopics')

// link
export const setSiteLink = createAction<LinkData[]>('setSiteLink')
export const getSiteLink = createAction<void>('getSiteLink')