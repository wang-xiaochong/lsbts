import { configureStore } from '@reduxjs/toolkit'
import sagaMiddleWare, { saga } from './saga/index';
import { UserState, userReducer } from './modules/user';

// state    ==> modules

export interface RootState {
    user: UserState,
}

// 1.action    ==>actions

// 2.reducer    ==>modules

// 3.store
const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(saga);

export default store;