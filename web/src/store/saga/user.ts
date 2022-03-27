import axios from '@/libs/axios';
import { put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/index'
import store from '../store'




export default function* user() {
    // token
    yield takeEvery(actions.user.restoreToken, function* () {
        let token = localStorage.token;
        if (token) {
            yield put(actions.user.setToken({ token }))
        }
    })

    yield takeEvery(actions.user.saveToken, function (action) {
        localStorage.token = action.payload.token
    })
    // userdata
    yield takeEvery(actions.user.getUserData, function* () {
        const { user } = store.getState();
        if (user.token && !user.userData) {
            let { data } = yield axios.get(`/api/user/getUserInfo`)
            yield put(actions.user.setUserData(data))
        }
    })
    // subscribe
    yield takeEvery(actions.user.getMySubscribe, function* () {
        const { user } = store.getState()
        if (user.token && !user.mySubscribe) {
            let { data } = yield axios.get(`/api/user/mysubscribe`)
            yield put(actions.user.setMySubscribe(data))
        }
    })
    yield takeEvery(actions.user.submitMySubscribe, function* ({ payload }) {
        yield axios.post(`/api/user/setMysubscribe`, JSON.stringify(payload))
        yield put(actions.user.setMySubscribe(payload))
    })

    //progressInfo
    yield takeEvery(actions.user.getMyProgressInfo, function* () {
        let { data } = yield axios.get(`/api/user/my-progress-info`);
        yield put(actions.user.setMyProgressInfo(data))
    })
    //courseList
    yield takeEvery(actions.user.getMyCourseList, function* () {
        let { data } = yield axios.get('/api/user/my-course-list');
        yield put(actions.user.setMyCourseList(data))
    })
    //chapters
    yield takeEvery(actions.user.getMyChapters, function* ({ payload: courseID }) {
        let { data } = yield axios.get(`/api/user/chapters/${courseID}`)
        yield put(actions.user.setMyChapters(data))
    })
    //orders
    yield takeEvery(actions.user.getMyOrder, function* () {
        let { data } = yield axios.get(`/api/user/my-orders`)
        yield put(actions.user.setMyOrder(data))
    })
}