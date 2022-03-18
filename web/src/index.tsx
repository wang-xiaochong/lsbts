import React from 'react';
import ReactDOM from 'react-dom';
// import Home from '@/views/Home';
import APP from './App';
import reportWebVitals from './reportWebVitals';



// import { CategoryData } from 'models/category';
import { AppData } from 'models/app';
import { isDev } from '@/config/app'
import { Provider } from 'react-redux'
import common from '@/libs/common'
import store from '@/store/store'
import actions from '@/store/actions/index'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
common.dispatch = store.dispatch
window.alert = function (str: string) {
  store.dispatch(actions.app.showAlert({
    content: str,
  }))
}
store.dispatch(actions.user.restoreToken());
let render = isDev ? ReactDOM.render : ReactDOM.hydrate
// let categories: CategoryData[] = (window as any).categories
let appData: AppData = (window as any).appData
// console.log(categories)
render(
  // <App categories={categories} />,
  <Provider store={store}>
    {/* <Home appData={appData} />, */}
    <APP />,
  </Provider>,
  // <Home />,
  document.getElementById('root')
);

reportWebVitals();
