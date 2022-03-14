import axios from '@/libs/axios';
import { put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/index'
import store from '../store'




export default function* token() {
    yield takeEvery(actions.user.restoreToken, function* () {
        let token = localStorage.token;
        if (token) {
            yield put(actions.user.setToken({ token }))
        }
    })

    yield takeEvery(actions.user.saveToken, function (action) {
        localStorage.token = action.payload.token
    })

    yield takeEvery(actions.user.getUserData, function* () {
        const { user } = store.getState();

        if (user.token && !user.userData) {
            let { data } = yield axios.get(`/api/user/getUserInfo`)
            yield put(actions.user.setUserData(data))
        }
    })
}