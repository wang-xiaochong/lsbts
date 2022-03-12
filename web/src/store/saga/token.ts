import {  put, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'


export default function* token() {
    yield takeEvery(actions.restoreToken, function* () {
        let token = localStorage.token;
        if (token) {
            yield put(actions.setToken({ token }))
        }
    })

    yield takeEvery(actions.saveToken, function (action) {
        localStorage.token = action.payload.token

    })
}