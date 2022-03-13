
import { createReducer, configureStore } from '@reduxjs/toolkit'

import { initState as initUserState } from '@/store/modules/user';
import { initState as initSiteState } from '@/store/modules/site'

// state    
const rootState = {
    user: initUserState,
    site:initSiteState,
}
// reducer
const reducer = createReducer(rootState, builder => builder)
// store
const store = configureStore({
    reducer,
});

export default store;