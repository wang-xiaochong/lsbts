import React from 'react';

import '@/assets/less/login.less';

export default function Login() {
  return (
    <>
      <div>
        <div className="g-login-shadow" />
        <div className="g-login">
          <div className="header">
            选择账号登录类型
            <span className="close-btn">
              <i className="icon icon-close-grey" />
            </span>
          </div>
          {/* step-1 */}
          <div className="login-start" style={{ display: 'none' }}>
            <div className="btns">
              <div className="btn btn-qq">
                <i className="icon icon-qq-w" />
                QQ登录
              </div>
              <div className="btn btn-wechat">
                <i className="icon icon-wechat-w" />
                微信登录
              </div>
            </div>
          </div>
          {/* step-2 */}
          <div className="login-wechat">
            <div className="qrcode">
              <img src="/image/tmp_qrcode_login.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};