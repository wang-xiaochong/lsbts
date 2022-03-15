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
    alertProps?: AlertProps;
}


export const initState: AppState = {
    alertProps: {
        content: '',
        visible: false,
    }
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


);