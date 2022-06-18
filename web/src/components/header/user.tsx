// import axios from "@/libs/axios";
import { UserData } from "models/user";
import React, { useState, useEffect } from "react";
import { RootState, UserState, Dispatch, actions } from '@/store/index'
import { connect } from 'react-redux'
import * as routers from '../../router'

// import * as routers from '../../router'
interface Props {
  userData?: UserData;
  user?: UserState;
  dispatch: Dispatch;
}
function User(props: Props) {
   const userInfo = props.user?.userData
   const[token,setToken] = useState<string|undefined>(undefined)
   
   const logout=()=>{
   props.dispatch(actions.user.clearToken())
   }
   
   useEffect(() => {
    if (props.user?.token) setToken(props.user.token)
  })

    useEffect(()=>{
        if (token&&!userInfo) {
            props.dispatch(actions.user.getUserData())
        }
    },[token])
    
  return (
    <>
      {/* <span className="btn">登录</span> */}
      {userInfo ? (
        <span  className="user">
          <a className="title" href={routers.my()}>
            <div className="avatar">
              <img src={userInfo.avatar} alt="头像" />
            </div>
            <div className="nickname">{userInfo.nickname}</div>
          </a>
          <div className="logout" onClick={ev=>{logout();routers.push(routers.home())}}>退出</div>
        </span>
      ) : (
        <a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101995223&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fxscloud.ltd%2Fgames"
          className="btn" >
          <img
            style={{ width: '10px' }}
            alt='QQ'
            src='/image/qq.png' />
          登录
        </a>
      )}
    </>
  )
}

export default connect((state: RootState) => {
  return state
})(User);