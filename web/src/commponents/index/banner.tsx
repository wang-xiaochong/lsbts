import React, { useState, useEffect } from 'react';

import { appData } from '@/models/app';
import { BannerData, getAllBanners } from '@/models/banner';

export default function Banner() {
  const [banners, setBanners] = useState<BannerData[] | undefined>(appData?.banners);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (!banners) {
      getAllBanners().then(data => {
        setBanners(data);
      });
    }
  }, [banners]);

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
  // console.log(banners)

  return (
    <div className="banner" style={{ backgroundColor: banners?banners[cur].color:'#000' }}>
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
            <span className="btn-login">登录</span>
          </div>
        </div>
      </div>
    </div>
  );
}