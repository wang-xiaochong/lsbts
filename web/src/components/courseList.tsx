import React from 'react';


import { CourseSummaryData } from '../models/course';
import { connect, RootState } from '@/store/index'
import * as routers from '../router'


interface Props {
  title?: string;
  data?: CourseSummaryData[];

}

function CourseList(props: Props) {
  const { title, data } = props;
  return (

    <div className="course-list">
      {data ? (<>
        {title ? (<h3 className="cap">{title}</h3>) : ''}
        <ul className="page list">
          {data?.map(course => (

            <li className="course" key={course.ID}>
              <div className="img">
                <a href={routers.course(course.ID)}><img src={course.cover} alt="" /></a>
              </div>
              <h4 className="title">
                <a href={routers.course(course.ID)}>{course.title}</a>
                {/* <Link to={routers.course(course.ID)}>{course.title}</Link> */}
              </h4>
              <div className="info">
                <span>共{course.section_count}节</span>
                <span className="split">|</span>
                <span>
                  <a href={routers.course(course.ID)}>{course.agency_name}</a>
                </span>
              </div>
              <div className="info2">
                <span className="price">{course.price ? `￥${course.price}` : '免费'}</span>
                <span className="student">{course.recent_order_count}人最近报名</span>
              </div>
            </li>

          ))}
        </ul>
      </>) :''}

    </div>
  );
}

export default connect((state: RootState) => state)(CourseList)