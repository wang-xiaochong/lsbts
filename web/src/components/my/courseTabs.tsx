import { ts2string } from '@/libs/common';
import { UserCourseTabData } from 'models/user';
import React from 'react';

interface Props {
  items: UserCourseTabData[];
  cur: number;
  onChange: (index: number) => void;
}

export default function CourseTabs(props: Props) {
  const { items, cur, onChange } = props;
  return (
    <div className="course-tabs">
      {items?.map((item, index) => (
        <div
          key={item.ID}
          className={`tab ${cur === index ? 'active' : ''}`}
          onClick={ev => onChange(index)}
        >
          <div className="title">{item.title}</div>
          {cur === index ? (
            <div className="expires">{ts2string(item.expires, 'yyyy-MM-dd')}到期</div>
          ) : (
            <div className="progress">
              <div className="progress-bar">
                <div className="bar" style={{ width: `${Math.round(item.progress * 100)}%` }} />
              </div>
              <div className="text">已学习{Math.round(item.progress * 100)}%</div>
            </div>
          )}
        </div>
      ))
      }
    </div >
  );
}