import React from 'react';

import { CourseSummaryData } from '../models/course';

interface Props {
  title?: string;
  data?: CourseSummaryData[];
}

export default function CourseList(props: Props) {
  // const { title, data } = props;

  return (
    <div className="course-list">
      <h3 className="cap">IT互联网热门课程</h3>
      <ul className="page list">
        <li className="course">
          <div className="img">
            <img src="/image/tmp_course_1.jpg" alt="" />
          </div>
          <h4 className="title">
            <a href="/">马士兵JAVA高级互联网架构师|JAVA程序员涨薪必备【马士兵教育】</a>
          </h4>
          <div className="info">
            <span>共31节</span>
            <span className="split">|</span>
            <span>
              <a href="/">马士兵教育</a>
            </span>
          </div>
          <div className="info2">
            <span className="price">免费</span>
            <span className="student">2万人最近报名</span>
          </div>
        </li>
      </ul>
    </div>
  );
}