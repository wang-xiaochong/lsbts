import React from 'react';
import ReactDOM from 'react-dom';
import Home from '@/views/Home';
import reportWebVitals from './reportWebVitals';
import '@/assets/less/base.less'
import '@/assets/less/common.less'
import '@/assets/less/index.less'
// import { CategoryData } from 'models/category';
import { AppData } from 'models/app';
import { isDev } from '@/config/app'
import { Provider } from 'react-redux'
import store from '@/store/index'
import actions from '@/store/actions/index'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
store.dispatch(actions.user.restoreToken())

let render = isDev ? ReactDOM.render : ReactDOM.hydrate
// let categories: CategoryData[] = (window as any).categories
let appData: AppData = (window as any).appData
// console.log(categories)
render(
  // <App categories={categories} />,
  <Provider store={store}>
    <Home appData={appData} />,
  </Provider>,
  // <Home />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
