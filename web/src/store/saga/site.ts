import axios from '@/libs/axios';
import { put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/index'
import store from '../store'

export default function* site() {
    // category
    yield takeEvery(actions.site.getAllCategory, function* () {
        let { data } = yield axios.get('/api/site/getCategories');
        yield put(actions.site.setAllCategory(data));
    })

    //search
    yield takeEvery(actions.site.getHotKeywords, function* () {
        let { data } = yield axios('/api/site/getHotKeyWords');

        yield put(actions.site.setHotKeywords(data));
    });

    yield takeEvery(actions.site.getSuggest, function* (action) {
        const kw = action.payload;

        if (!kw) {
            yield put(actions.site.setSuggest(undefined));
        } else {
            let { data } = yield axios(`/api/site/getSuggest/${action.payload}`);
            yield put(actions.site.setSuggest(data));
        }
    });

    // banner
    yield takeEvery(actions.site.getAllBanner, function* () {
        let { data } = yield axios.get(`/api/site/getAllBanners`)
        yield put(actions.site.setAllBanner(data))
    })


    // subscribe
    yield takeEvery(actions.site.getAllSubscribeData, function* () {
        let { data } = yield axios.get(`/api/site/getAllSubscibe`)
        yield put(actions.site.setAllSubscribeData(data))
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