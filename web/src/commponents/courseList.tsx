import React from 'react';

import { CourseSummaryData } from '../models/course';

interface Props {
  title?: string;
  data?: CourseSummaryData[];
}

export default function CourseList(props: Props) {
  const { title, data } = props;
  return (
    <div className="course-list">
      <h3 className="cap">{title}</h3>
      <ul className="page list">
        {data?.map(course => (
          <li className="course" key={course.ID}>
            <div className="img">
              <img src={course.cover} alt="" />
            </div>
            <h4 className="title">
              <a href='/'>{course.title}</a>
            </h4>
            <div className="info">
              <span>共{course.section_count}节</span>
              <span className="split">|</span>
              <span>
                <a href="/">{course.agency_name}</a>
              </span>
            </div>
            <div className="info2">
              <span className="price">{course.price ? `￥${course.price}` : '免费'}</span>
              <span className="student">{course.recent_order_count}人最近报名</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}