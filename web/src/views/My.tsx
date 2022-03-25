import React from 'react';

import NavMenu from '@/components/my/navmenu'
import CommonLeft from '@/components/my/commonLeft'
import UserInfo from '@/components/my/userInfo'
import CourseTabs from '@/components/my/courseTabs'
import CourseSummary from '@/components/my/courseSummary'
import Chapters from '@/components/my/chapters'




interface Props {

}

export default function My(props: Props) {
  return (

    <div className="main-container">
      <div className="main-content">
        <div className="left">
          <NavMenu />
          <CommonLeft />
        </div>
        <div className="right">
          <h3 className="c-title">课程表</h3>
          <UserInfo points={0} todayStudySecs={3670} />
          <CourseTabs />
          <div className="chapter-container">
            <CourseSummary />
            <div className="current">
              <div className="section-title">当前任务</div>
              <Chapters />
            </div>
            <div className="chapter-list">
              <div className="section-title">
                全部任务
                <span className="sm">(共6节)</span>
              </div>
              <Chapters />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};