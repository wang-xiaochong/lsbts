import {  put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/index'


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
}