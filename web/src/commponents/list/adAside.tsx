import React from 'react';

interface Props {

}

export default function AdAside(props: Props) {
  return (
    <div className="ad-aside">
      <h3 className="cap">热门推荐</h3>
      <ul className="list">
        <li className="item">
          <div className="cover">
            <img src="/image/tmp_course_ad_1.webp" alt="" />
          </div>
          <div className="title">CAD全套【CAD零基础制图教程】</div>
          <div className="info">
            <div className="price">免费</div>
            <div className="author">
              云艺帆教育
                  </div>
          </div>
        </li>
      </ul>
    </div>
  );
}