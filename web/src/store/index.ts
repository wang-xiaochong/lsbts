import { configureStore } from '@reduxjs/toolkit'
import sagaMiddleWare, { saga } from './saga/index';
import { UserState, userReducer } from './modules/user';
import { SiteState, siteReducer } from './modules/site';

// state    ==> modules

export interface RootState {
    user: UserState,
    site: SiteState,
}

// 1.action    ==>actions

// 2.reducer    ==>modules

// 3.store
const store = configureStore({
    reducer: {
        user: userReducer,
        site: siteReducer,
    },
    middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(saga);

export default store;