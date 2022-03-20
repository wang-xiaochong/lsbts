import { LinkData, SubscribeData, TopicData } from 'models/site'
import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions/index'
import { appData } from 'models/app';
import { CategoryData } from 'models/category';

export interface SiteState {
    CategoryData?: CategoryData[];
    SubscribeData?: SubscribeData[];
    topics?: TopicData[];
    links?: LinkData[];
}


export const initState: SiteState = {
    topics: appData?.topics,
    links: appData?.links,
}

export const siteReducer = createReducer(
    initState,
    builder => builder
        // category
        .addCase(actions.site.setAllCategory, (state, action) => {
            return { ...state, CategoryData: action.payload }
        })
        // subscribe
        .addCase(actions.site.setAllSubscribeData, (state, action) => {
            return { ...state, SubscribeData: action.payload }
        })
        // topics
        .addCase(actions.site.setTopics, (state, action) => {
            return { ...state, topics: action.payload }
        })
        //links
        .addCase(actions.site.setSiteLink, (state, action) => {
            return { ...state, links: action.payload }
        })


);