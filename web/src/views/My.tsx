import React, { useEffect, useState } from 'react';

import NavMenu from '@/components/my/navmenu'
import CommonLeft from '@/components/my/commonLeft'
import UserInfo from '@/components/my/userInfo'
import CourseTabs from '@/components/my/courseTabs'
import CourseSummary from '@/components/my/courseSummary'
import Chapters from '@/components/my/chapters'
import { connect, actions, UserState, Dispatch, RootState } from '@/store/index'


interface Props {
  user: UserState,
  dispatch: Dispatch,
}

function My(props: Props) {

  const [courseTabsCur, setCourseTabsCur] = useState(0)

  const myProgressInfo = props.user.myProgressInfo;
  if (!myProgressInfo) {
    props.dispatch(actions.user.getMyProgressInfo())
  }
  const myCourseList = props.user.myCourseList;
  if (!myCourseList) {
    props.dispatch(actions.user.getMyCourseList())
  }
  const myChapters = props.user.myChapters;
  useEffect(() => {
    if (myCourseList) {
      let course = myCourseList[courseTabsCur];
      props.dispatch(actions.user.getMyChapters(course.ID))


    }
//eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [myCourseList, courseTabsCur])


  return (
    < div className="main-container" >
      <div className="main-content">
        <div className="left">
          <NavMenu />
          <CommonLeft />
        </div>
        <div className="right">
          <h3 className="c-title">课程表</h3>

          {myProgressInfo ? (
            <UserInfo
              points={myProgressInfo.points}
              todayStudySecs={myProgressInfo.todayCourseSec}
              pointRank={myProgressInfo.todayCourseRank}
            />
          ) : ''}


          {myCourseList ? (
            <CourseTabs
              items={myCourseList}
              cur={courseTabsCur}
              onChange={index => setCourseTabsCur(index)}
            />
          ) : ''}


          <div className="chapter-container">
            <CourseSummary
              ClassName='java1班'
              progress={0.1}
            />


            <div className="current">
              <div className="section-title">当前任务</div>
              {myChapters?(<Chapters chapters={myChapters} />):''}
            </div>


            <div className="chapter-list">
              <div className="section-title">
                全部任务
                <span className="sm">(共6节)</span>
              </div>
              {myChapters?(<Chapters chapters={myChapters} />):''}
              
            </div>


          </div>
        </div>
      </div>
    </div >
  );
};

export default connect((state: RootState) => state)(My)