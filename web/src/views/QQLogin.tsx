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

var token='';
async function QQlogin(userData: any, openID: string):Promise<boolean> {
    // console.log(userData);
    let { nickname, figureurl_qq } = userData
    var userdata = {
        nickname,
        token: '',
        avatar: figureurl_qq,
    }
    userdata.token = guid();
    // 根据用户平台唯一openID去自己数据库查找该用户是否存在，存在则更新信息，不存在则添加用户

    // 1.查找用户信息
    let ret = await axios2(`/api/user/userCheck?openID=${openID}`)
    // 找到了就更新用户信息

    if (ret.data.user_id && ret.data.user_id !== -1) {
        console.log(ret)
        let user_id = ret.data.user_id;
        token = userdata.token;
        return await axios2.post(`/api/user/update`, {userdata,user_id});
        
    } else {
        // 新增用户信息
        token = userdata.token;
        return  await axios2.post(`/api/user/add`, { userdata, openID });
        }
}


var Info = '';
async function GetUserInfo(): Promise<{ Info: any, id: string } | undefined> {
    let token = await getQueryVariable() || ''
    let id = await getOpenID(token)
    Info = await getUserInfo(token, id, key)
    if (Info) {
        return { Info, id }
    } else {
        return
    }
    // window.localStorage.setItem('Info', Info)
    // console.log(Info)
    // return Info
}


async function render() {
    let ret = await GetUserInfo();
    if (ret) {
        let { Info, id } = ret;
        let loginResult = await QQlogin(Info, id);
        if (loginResult) {
            window.location.replace(`/?token=${token}`)
        }else {
            alert('登录失败，请刷新重试')
        }
    } else {
        alert('登录失败，请刷新重试')
    }
}