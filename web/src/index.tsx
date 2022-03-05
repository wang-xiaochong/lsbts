import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@/assets/less/base.less'
import '@/assets/less/common.less'
import { CategoryData } from 'models/category';
import { isDev } from '@/config/app'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

let render = isDev ? ReactDOM.render : ReactDOM.hydrate
let categories: CategoryData[] = (window as any).categories
// console.log(categories)
render(
  <App categories={categories} />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
