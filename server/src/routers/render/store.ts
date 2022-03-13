
import { createReducer, configureStore } from '@reduxjs/toolkit'

import { initState as initUserState } from '@/store/modules/user';

// state    
const rootState = {
    user: initUserState,
}
// reducer
const reducer = createReducer(rootState, builder => builder)
// store
const store = configureStore({
    reducer,
});

export default store;