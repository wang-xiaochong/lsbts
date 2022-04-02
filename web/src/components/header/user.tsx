// import axios from "@/libs/axios";
import { UserData } from "models/user";
import React,{useState,useEffect} from "react";
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
  let token = props.user?.token;
   const[userInfo,setUserInfo] = useState<UserData|undefined>(props.user?.userData)
  useEffect(()=>{
    if (token&&!userInfo) {
      props.dispatch(actions.user.getUserData())
      setUserInfo(props.user?.userData)
    }
    },[props.user?.userData])

  return (
    <>
      {/* <span className="btn">登录</span> */}

      {userInfo ? (
        <a href={routers.my()} className="user">
          <div className="title">
            <div className="avatar">
              <img src={userInfo.avatar} alt="头像" />
            </div>
            <div className="nickname">{userInfo.nickname}</div>
          </div>
        </a>
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