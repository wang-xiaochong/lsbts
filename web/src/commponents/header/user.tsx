import React from "react";
export default function User() {

  console.log(window.location.search)





  return (
    <>
      {/* <span className="btn">登录</span> */}
      <a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101490224&response_type=token&scope=all&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fproxy" className="btn">登录</a>
      {/* or */}
      {/* <div className="user">
            <div className="title">
              <div className="avatar">
                <img src="/image/tmp_avatar.jpg" alt="头像" />
              </div>
              <div className="nickname">张三的学习账号很长</div>
            </div>
          </div> */}
    </>
  )
}