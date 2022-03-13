
import user from './user'
import createSagaMiddleWare from 'redux-saga'
import { all } from 'redux-saga/effects';

export function* saga() {
    yield all([
        user(),
    ])
}

let sagaMiddleWare = createSagaMiddleWare();

// setTimeout(() => {
//     sagaMiddleWare.run(saga);
// }, 0);

export default sagaMiddleWare;
