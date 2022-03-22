import { AdCourseData } from 'models/course';
import React from 'react';

interface Props {
  items: AdCourseData[],
}

export default function AdAside(props: Props) {
  const { items } = props;
  return (
    <div className="ad-aside">
      <h3 className="cap">热门推荐</h3>
      <ul className="list">
        {items.map(item => (
          <li key={item.ID} className="item">
            <div className="cover">
              <img src={item.cover} alt="" />
            </div>
            <div className="title">{item.title}</div>
            <div className="info">
              <div className="price">{item.price === 0 ? '免费' : item.price}</div>
              <div className="author">
                {item.agency_name}
              </div>
            </div>
          </li>
        ))
        }
      </ul>
    </div>
  );
}