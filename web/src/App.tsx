import React, { useEffect } from "react";

import Home from './views/Home'
import List from './views/List'
import Alert from "./commponents/alert";
import querystring from "./libs/querystring";
import { getUserData, saveToken, setToken } from "./store/actions/user";
import { Dispatch } from "redux";
import { UserState } from "./store";
import Footer from "./commponents/footer/footer";
import Header from "./commponents/header/header";

// 公用样式
import '@/assets/less/base.less'
import '@/assets/less/common.less'
import '@/assets/less/alert.less'

// 首页
import '@/assets/less/index.less'
import '@/assets/less/subscribe.less'

// 列表(搜索)
import '@/assets/less/list.less'

// 路由
import { BrowserRouter, Routes, Route } from 'react-router-dom'

interface Props {
    user?: UserState;
    dispatch?: Dispatch;
}

export default function App(props: Props) {
    useEffect(() => {
        const { token } = querystring(['token']);
        if (token) {
            if (props.dispatch) {
                props.dispatch(saveToken({ token }))
                props.dispatch(setToken({ token }))
                window.location.href = '/';
            }
        }
    });
    useEffect(() => {
        const { user } = props
        if (user?.token) {
            if (props.dispatch)
                props.dispatch(getUserData())
        }
    })
    return (
        <>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/list" element={<List />}></Route>
                </Routes>

                <Alert />
                <Footer />
            </BrowserRouter>
        </>
    )

}