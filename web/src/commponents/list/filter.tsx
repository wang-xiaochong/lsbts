import React from 'react';

interface Props {

}

export default function Filter(props: Props) {
  return (
    <div className="course-filter">
      <div className="filter">
        <div className="group radio">
          <span className="btn active">全部</span>
          <span className="btn">免费课</span>
          <span className="btn">付费课</span>
        </div>
        <div className="split">|</div>
        <div className="group check">
          <label>
            <input type="checkbox" />录播
                </label>
          <label>
            <input type="checkbox" />直播
                </label>
          <label>
            <input type="checkbox" />有回放
                </label>
        </div>
        <div className="split">|</div>
        <div className="group check">
          <label>
            <input type="checkbox" />认证课程
                </label>
        </div>
        <div className="split">|</div>
        <div className="group check">
          <label>
            <input type="checkbox" />正在直播
                </label>
        </div>
      </div>
      <div className="order">
        <div className="btn active">
          综合排序
              </div>
        <div className="btn">
          好评率
                <i className="icon icon-arrowdown" />
        </div>
        <div className="btn">
          人气
                <i className="icon icon-arrowdown" />
        </div>
        <div className="btn">
          价格
                <i className="icon icon-arrowdown" />
        </div>
      </div>
    </div>
  );
}