// import axios from "@/libs/axios";
import { UserData } from "models/user";
import React from "react";
import { RootState } from '@/store/index'
import { connect } from 'react-redux'

interface Props {
  userData?: UserData,
}
function User(props: Props) {
  let userInfo = props.userData
  return (
    <>
      {/* <span className="btn">登录</span> */}
      {!userInfo ?
        (<a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101490224&response_type=token&scope=all&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fproxy" className="btn">登录</a>)
        :
        (
          <div className="user">
            <div className="title">
              <div className="avatar">
                <img src={userInfo.avatar} alt="头像" />
              </div>
              <div className="nickname">{userInfo.nickname}</div>
            </div>
          </div>)
      }

    </>
  )
}

export default connect((state: RootState) => {
  return state.user
})(User);