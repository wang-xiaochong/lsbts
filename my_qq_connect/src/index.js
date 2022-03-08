import React from 'react';
import ReactDOM from 'react-dom';
import { App, MyRoutes } from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom'
<script src="http://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
ReactDOM.render(
  <BrowserRouter>
    <App />
    <MyRoutes />
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
