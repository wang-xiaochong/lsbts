import axios from '@/libs/axios';
import { put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/index'
import store from '../store'

export default function* site() {
    // subscribe
    yield takeEvery(actions.site.getAllSubscribeData, function* () {
        const { site } = store.getState()
        if (!site.SubscribeData) {
            let { data } = yield axios.get(`/api/site/getAllSubscibe`)
            yield put(actions.site.setAllSubscribeData(data))
        }
    })
    // topic
    yield takeEvery(actions.site.getTopics, function* () {
        let { data } = yield axios.get('/api/site/getTopics');
        yield put(actions.site.setTopics(data));
    })
    // link
    yield takeEvery(actions.site.getSiteLink, function* () {
        let { data } = yield axios.get('/api/site/getSiteLink')
        yield put(actions.site.setSiteLink(data))
    })



}