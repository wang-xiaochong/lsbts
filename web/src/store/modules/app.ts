import { createReducer } from '@reduxjs/toolkit'
import { ReactChild } from 'react';
import actions from '../actions/index'

export interface AlertProps {
    content: string | ReactChild;
    title?: string;

    visible?: boolean;

    showOk?: boolean;
    onOk?: () => void | Promise<void>;

    showCancel?: boolean;
    onCancel?: () => void | Promise<void>;


}

export interface AppState {
    searchBarKw?: string,
    alertProps?: AlertProps;
    // header footer
    globalHeaderVisible?: boolean;
    globalFooterVisible?: boolean;

}


export const initState: AppState = {
    searchBarKw: '',
    alertProps: {
        content: '',
        visible: false,
    },
    globalHeaderVisible: true,
    globalFooterVisible: true,

}

export const appReducer = createReducer(
    initState,
    builder => builder
        .addCase(actions.app.showAlert, (state, action) => {
            return {
                ...state, alertProps: {
                    ...action.payload,
                    visible: true,
                }
            }
        })
        .addCase(actions.app.hideAlert, (state) => {
            return {
                ...state, alertProps: {
                    content: '',
                    visible: false,
                }
            }
        })
        //search keyword
        .addCase(actions.app.setSearchBarKw, (state, action) => {
            return {
                ...state,
                searchBarKw: action.payload,
            }
        })
        // hearder footer
        .addCase(actions.app.setHeaderVisible, (state, { payload }) => {
            return {
                ...state, globalHeaderVisible: payload
            }
        })
        .addCase(actions.app.setFooterVisible, (state, { payload }) => {
            return {
                ...state, globalFooterVisible: payload
            }
        })


);