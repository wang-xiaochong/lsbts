import { SubscribeData } from 'models/site'
import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions/index'

export interface SiteState {
    SubscribeData?: SubscribeData[];
}


export const initState: SiteState = {}

export const siteReducer = createReducer(
    initState,
    builder => builder
        .addCase(actions.site.setSubscribeData, (state, action) => {
            return { ...state, SubscribeData:action.payload  }
        })
        
);