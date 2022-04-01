import axios from "axios";
import axios2 from '@/libs/axios'
import React, { useState } from "react";

import { connect, Dispatch, actions, AppState, RootState } from '../store'


interface Props {
    app?: AppState;
    dispatch: Dispatch;
}

function QQLogin(props: Props) {

    const [headerVisible, setHeaderVisible] = useState(true)
    if (props.app?.globalHeaderVisible !== false) props.dispatch(actions.app.setHeaderVisible(false))
    if (props.app?.globalFooterVisible !== false) props.dispatch(actions.app.setFooterVisible(false))
    render();


    return (
        <>
            <div>
                Login...
            </div>
        </>
    )
}

export default connect((state: RootState) => state)(QQLogin)


// const qqBaseUrl = 'https://graph.qq.com'
const key = 101995223

async function getQueryVariable() {
    // 返回的access_token是放在hash里面的
    let query = window.location.hash.substring(1) + '';
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === 'access_token') { return pair[1]; }
    }
    return (false);
}

async function getOpenID(token: string) {
    if (token) {
        let ret = await axios(`/oauth2.0/me?access_token=${token}`);
        let vars = ret.data.split(":");
        let pair = vars[2].split("\"");
        return pair[1];
    } else {
        console.log('access_token is null')
        return
    }
}

async function getUserInfo(token: string, id: string, key: number) {
    if (id) {
        let ret = await axios(`/user/get_user_info?access_token=${token}&openid=${id}&oauth_consumer_key=${key}`)
        return ret.data
    } else {
        console.log('openID is null')
        return
    }
}


function guid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
    });
}


async function QQlogin(userData: any) {
    console.log(userData);
    let { nickname, figureurl_qq_1 } = userData
    var userdata = {
        nickname,
        token: '',
        avatar: figureurl_qq_1,
    }
    let ret = await axios2(`/api/user/userCheck?nickname=${nickname}`)
    if (ret.data.token === '') {
        // 新增用户
        userdata.token = guid()
        let ret = await axios2.post(`/api/user/userAdd`, userdata)
        if (ret.data) {
            return userdata.token
        } else {
            return ''
        }
    } else {
        // 更换用户状态
        return ret.data.token

    }
}


var Info = '';
export async function GetUserInfo() {
    let token = await getQueryVariable() || ''
    let id = await getOpenID(token)
    Info = await getUserInfo(token, id, key)
    if (Info) {
        return Info
    } else {
        return
    }
    // window.localStorage.setItem('Info', Info)
    // console.log(Info)
    // return Info
}



async function render() {
    let Info = await GetUserInfo();
    if (Info) {
        // 1.查询数据库是否存在该用户 存在更改用户状态 不存在则添加
        let token = await QQlogin(Info)
        if (token !== '') {
            // window.location.replace(`http://localhost:8080/?token=${token}`)
            window.location.replace(`/?token=${token}`)
        } else {
            alert('登录失败');
            window.location.replace(`/`);
        }
        // setTimeout(() => {
        //     let nickname = document.createElement('h3')
        //     nickname.innerHTML = Info.nickname
        //     document.body.appendChild(nickname)
        //     let headimg = document.createElement('img')
        //     headimg.src = Info.figureurl_qq_2
        //     document.body.appendChild(headimg)
        // }, 2000);

        // window.location.replace(`http://localhost:8080/?token=${ret}`);
    } else {
        alert('请重试');
    }
}


