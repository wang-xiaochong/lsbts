import { configureStore } from '@reduxjs/toolkit'
import sagaMiddleWare, { saga } from './saga/index';
import { UserState, userReducer } from './modules/user';
import { SiteState, siteReducer } from './modules/site';
import { appReducer } from './modules/app';
import { courseReducer } from './modules/course';


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
        app: appReducer,
        course: courseReducer,

    },
    middleware: [sagaMiddleWare],
});
sagaMiddleWare.run(saga);

export default store;