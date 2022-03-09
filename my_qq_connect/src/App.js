import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { Proxy } from './Proxy'
import {Home} from './Home'

export class App extends Component {
  render() {
    return (
      <div className="list-group">
        {/* 在React中靠路由链接实现切换组件 */}
        {/* <Link className="list-group-item" to="/home">Home</Link>
              <Link className="list-group-item" to="/about">About</Link> */}
      </div>
    )
  }
}

export class MyRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/proxy" element={Proxy} />
        <Route path="/home" element={Home} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    )
  }
}



