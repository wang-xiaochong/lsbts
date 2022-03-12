
import token from './saga/token'
import createSagaMiddleWare from 'redux-saga'

export function* saga() {
    yield token();
}

let sagaMiddleWare = createSagaMiddleWare();

// setTimeout(() => {
//     sagaMiddleWare.run(saga);
// }, 0);

export default sagaMiddleWare;
