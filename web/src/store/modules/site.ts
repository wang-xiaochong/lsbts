import { SubscribeData, TopicData } from 'models/site'
import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions/index'
import { appData } from 'models/app';

export interface SiteState {
    SubscribeData?: SubscribeData[];
    topics?: TopicData[];
}


export const initState: SiteState = {
    topics: appData?.topics,
}

export const siteReducer = createReducer(
    initState,
    builder => builder
        // subscribe
        .addCase(actions.site.setAllSubscribeData, (state, action) => {
            return { ...state, SubscribeData: action.payload }
        })
        // topics
        .addCase(actions.site.setTopics, (state, action) => {
            return { ...state, topics: action.payload }
        })


);