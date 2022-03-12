
import user from './saga/user'
import createSagaMiddleWare from 'redux-saga'

export function* saga() {
    yield user();
}

let sagaMiddleWare = createSagaMiddleWare();

// setTimeout(() => {
//     sagaMiddleWare.run(saga);
// }, 0);

export default sagaMiddleWare;
