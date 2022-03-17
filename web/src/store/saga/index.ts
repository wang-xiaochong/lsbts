
import user from './user';
import site from './site';
import course from './course'
import createSagaMiddleWare from 'redux-saga'
import { all } from 'redux-saga/effects';

export function* saga() {
    yield all([
        user(), site(), course(),
    ])
}

let sagaMiddleWare = createSagaMiddleWare();

// setTimeout(() => {
//     sagaMiddleWare.run(saga);
// }, 0);

export default sagaMiddleWare;
