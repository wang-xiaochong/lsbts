import React, { useState } from 'react';

import NavMenu from '@/components/my/navmenu'
import CommonLeft from '@/components/my/commonLeft'
import UserInfo from '@/components/my/userInfo'
import CourseTabs from '@/components/my/courseTabs'
import CourseSummary from '@/components/my/courseSummary'
import Chapters from '@/components/my/chapters'




interface Props {

}

export default function My(props: Props) {

  const [courseTabsCur, setCourseTabsCur] = useState(0)
  const chapters: {
    ID: number;
    title: string;
    progress: number;
    sections: {
      ID: number;
      title: string;
      time?: number;
      progress?: number;
      type: 'live' | 'video' | 'read' | 'download'
    }[]
  }[] = [
      {
        ID: 1, title: '认识java', progress: 0.53, sections: [
          { ID: 5, title: '1节', time: 789798798, progress: 0.3, type: 'live' },
          { ID: 6, title: '2节', time: 789798798, progress: 0.1, type: 'video' },
          { ID: 7, title: '3节', type: 'read' },
          { ID: 8, title: '5节', type: 'download' }
        ]
      }
    ]

  return (
    < div className="main-container" >
      <div className="main-content">
        <div className="left">
          <NavMenu />
          <CommonLeft />
        </div>
        <div className="right">
          <h3 className="c-title">课程表</h3>
          <UserInfo
            points={0}
            todayStudySecs={3670}
            pointRank={0.38}
          />
          <CourseTabs
            items={[
              {
                title: '计算机原生',
                expires: 123455,
                progress: 0.37,
              },
              {
                title: '设计',
                expires: 123455,
                progress: 0.2,
              }
            ]}
            cur={courseTabsCur}
            onChange={index => setCourseTabsCur(index)}
          />
          <div className="chapter-container">
            <CourseSummary
              ClassName='java1班'
              progress={0.1}
            />
            <div className="current">
              <div className="section-title">当前任务</div>
              <Chapters
                chapters={chapters}
              />
            </div>
            <div className="chapter-list">
              <div className="section-title">
                全部任务
                <span className="sm">(共6节)</span>
              </div>
              <Chapters chapters={chapters} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};