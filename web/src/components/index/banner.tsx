import React, { useState } from 'react';

import { appData } from '@/models/app';
import { connect, SiteState, actions, Dispatch, RootState } from '@/store/index'

interface Props {
  site: SiteState;
  dispatch: Dispatch;
}

function Banner(props: Props) {
  const banners = appData?.banners || props.site.BannerData;
  const [cur, setCur] = useState(0);

  if (!banners) props.dispatch(actions.site.getAllBanner())

  const prev = () => {
    if (banners) {
      setCur(cur === 0 ? banners.length - 1 : cur - 1)
    }
  };
  const next = () => {
    if (banners) {
      setCur(cur === banners.length - 1 ? 0 : cur + 1);
    }
  }


  return (
    <div className="banner" style={{ backgroundColor: banners ? banners[cur].color : '#000' }}>
      <div className="page">
        <div className="content">
          <span className="btn btn-prev" onClick={prev}>
            <i className="icon icon-left-w" />
          </span>
          <span className="btn btn-next" onClick={next}>
            <i className="icon icon-right-w" />
          </span>
          {banners ? (
            <>
              <ul className="banner-list">
                {banners.map((banner, index) => (
                  <li key={banner.ID} className={index === cur ? 'active' : ''}>
                    <a href={banner.href}>
                      <img src={banner.img} alt="" />
                    </a>
                  </li>
                ))}
              </ul>
              <ol className="indicator-list">
                {banners.map((banner, index) => (
                  <li key={banner.ID} className={index === cur ? 'active' : ''} />
                ))}
              </ol>
            </>
          ) : ''}
        </div>

        <div className="user">
          <div className="no-user">
            <div className="title">跟进你的学习进度</div>
            <div className="img" />
          </div>
          <div className="login">
            <a className="btn-login" href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101995223&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fxscloud.ltd%2Fgames">登录</a>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default connect((state: RootState) => state)(Banner)