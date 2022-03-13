import axios from '@/libs/axios';
import { put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/index'
import store from '../index'


export default function* site() {
    yield takeEvery(actions.site.getSubscribeData, function* () {
        const { site } = store.getState()
        if (!site.SubscribeData) {
            let { data } = yield axios.get(`/api/site/getAllSubscibe`)
            yield put(actions.site.setSubscribeData(data))
        }
    })
}