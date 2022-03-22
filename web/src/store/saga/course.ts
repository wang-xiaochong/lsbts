import axios from '@/libs/axios';
import { put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/index'

export default function* course() {
    // course

    yield takeEvery(actions.course.getIndexCourseSummary, function* ({ payload: category }) {
        let { data } = yield axios.get('/api/course/index-course-list',
            { params: { category } });
        yield put(actions.course.setIndexCourseSummary({ category, data }));
    })

    yield takeEvery(actions.course.getSearchCourse, function* ({ payload }) {
        let { data } = yield axios.post(`/api/course/search`, JSON.stringify(payload))
        yield put(actions.course.setSearchCourseResult(data))
    })

    //category
    yield takeEvery(actions.course.getSearchCategoryData, function* ({ payload: { category, category_level } }) {
        let { data } = yield axios.get('/api/course/get-category-options', {
            params: { category, category_level }
        });
        console.log(data);

        yield put(actions.course.setSearchCategoryData(data));
    })


}