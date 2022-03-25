import React from 'react';

interface Props {

}

export default function CommonLeft(props: Props) {
  return (
    <>
      <div className="ad-container">
        <img src="/image/tmp_ad_course_left.png" alt="" />
      </div>
      <a href="/" className="download">
        <span className="l-icon">
          <i className="icon icon-download" />
        </span>
        <span className="r-content">
          <span className="title">下载Windows客户端</span>
          <span className="desc">流畅上课不卡顿</span>
        </span>
      </a>
      <a href="/" className="download">
        <span className="l-icon">
          <i className="icon icon-download" />
        </span>
        <span className="r-content">
          <span className="title">下载Mac客户端</span>
          <span className="desc">流畅上课不卡顿</span>
        </span>
      </a>
    </>
  );
}