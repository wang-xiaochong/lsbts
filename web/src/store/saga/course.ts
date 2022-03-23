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
        yield put(actions.course.setSearchCategoryData(data));
    })
    //ad
    yield takeEvery(actions.course.getAdList, function* ({ payload }) {
        let { data } = yield axios.get('/api/course/ad', {
            params: { type: payload }
        });
        yield put(actions.course.setAdList(data));
    })

    // course detail
    yield takeEvery(actions.course.getCourseDetail, function* ({ payload: courseID }) {
        let { data } = yield axios.get(`/api/course/detail/${courseID}`);
        yield put(actions.course.setCourseDetail(data))
    })

    // video section
    yield takeEvery(actions.course.getVideoSectionData, function* ({ payload: sectionID }) {
        let { data } = yield axios.get(`/api/course/video-section/${sectionID}`);
        yield put(actions.course.setVideoSectionData(data))
    })




}