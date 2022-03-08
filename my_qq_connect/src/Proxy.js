
import axios from "./axios";

var key = 101490224

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

async function getOpenID(token) {
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

async function getUserInfo(token, id, key) {
    console.log("123",token,id,key,"456")
    if (id) {
        let ret = await axios(`/user/get_user_info?access_token=${token}&openid=${id}&oauth_consumer_key=${key}`)
        return ret.data
    } else {
        console.log('openID is null')
        return
    }
}

var Info = ''
export async function GetUserInfo() {
    let token = await getQueryVariable()
    let id = await getOpenID(token)
    Info = await getUserInfo(token, id, key)
    console.log(Info)
    return Info
}

function render() {
    setTimeout(() => {
        let nickname = document.createElement('h3')
        nickname.innerHTML = Info.nickname
        document.body.appendChild(nickname)
        let headimg = document.createElement('img')
        headimg.src = Info.figureurl_qq_2
        document.body.appendChild(headimg)
    }, 2000);

}




export var Proxy = <>
    <div>
        <div style={{ display: 'none' }} innerHTML={GetUserInfo()} >Info</div>
        <div style={{ display: 'none' }} innerHTML={render()}>render</div>
    </div>
</>
