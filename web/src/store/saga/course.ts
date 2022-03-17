import axios from '@/libs/axios';
import { put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/index'
import store from '../store'

export default function* site() {
    // course
    yield takeEvery(actions.course.getIndexCourseSummary, function* ({ payload: category }) {
        let { data } = yield axios.get('/api/course/index-course-list',
            { params: { category } });
        yield put(actions.course.setIndexCourseSummary({category, data}));
    })
}