import React, { useEffect } from "react";

import Home from './views/Home'
import List from './views/List'
import Course from './views/Course'
import NotFound from "./views/NotFound";
import Video from "./views/Video";



import Alert from "./commponents/alert";
import querystring from "./libs/querystring";
import { getUserData, saveToken, setToken } from "./store/actions/user";
import { AppState, RootState, UserState } from "./store";
import Footer from "./commponents/footer/footer";
import Header from "./commponents/header/header";

import { connect, Dispatch, actions } from '@/store'


// 公用样式
import '@/assets/less/base.less'
import '@/assets/less/common.less'
import '@/assets/less/alert.less'

// 首页
import '@/assets/less/index.less'
import '@/assets/less/subscribe.less'

// 列表(搜索)
import '@/assets/less/list.less'
// 课程
import '@/assets/less/course.less'
// 视频
import '@/assets/less/video.less'

// 路由
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import * as routers from '@/router'
interface Props {
    app?: AppState;
    user?: UserState;
    dispatch?: Dispatch;
}

function App(props: Props) {
    const header = props.app?.globalHeaderVisible === undefined ? true : props.app?.globalHeaderVisible;
    const footer = props.app?.globalFooterVisible === undefined ? true : props.app?.globalFooterVisible;;
    // useEffect(() => {
    //     const { token } = querystring(['token']);
    //     if (token) {
    //         if (props.dispatch) {
    //             props.dispatch(saveToken({ token }))
    //             props.dispatch(setToken({ token }))
    //             window.location.href = '/';
    //         }
    //     }
    // });
    // useEffect(() => {
    //     const { user } = props
    //     if (user?.token) {
    //         if (props.dispatch)
    //             props.dispatch(getUserData())
    //     }
    // })
    return (
        <>
            <BrowserRouter>
                {header ? (<Header /> ): ''}

                <Routes>
                    <Route path={routers.home()} element={<Home />}></Route>
                    <Route path={routers.list()} element={<List />}></Route>
                    <Route path='/course/:id' element={<Course />} ></Route>
                    <Route path='/video/:sectionID' element={<Video />} ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>

                <Alert />
                {footer ? (<Footer />) : ''}
            </BrowserRouter>
        </>
    )

}

export default connect((state: RootState) => state)(App)