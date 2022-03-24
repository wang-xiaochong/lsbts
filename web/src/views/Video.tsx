import React from 'react';

import { connect, Dispatch, actions, UserState, CourseState, AppState, RootState } from '../store';

import { useParams } from 'react-router-dom'
import * as routers from '../router';

interface Props {
    app?: AppState;
    user?: UserState;
    course?: CourseState;

    dispatch: Dispatch;
}

function Video(props: Props) {
    const userData = props.user?.userData;
    const videoSectionData = props.course?.videoSectionData;
    const {sectionID} = useParams<{ sectionID: string }>();
    if (props.app?.globalHeaderVisible !== false) props.dispatch(actions.app.setHeaderVisible(false))
    if (props.app?.globalFooterVisible !== false) props.dispatch(actions.app.setFooterVisible(false))
    if (!videoSectionData) props.dispatch(actions.course.getVideoSectionData(Number(sectionID)))

    return (
        <>
            <a href={routers.home()}>返回首页</a>
            <div className="video-player">
                <div className="header">
                    <div className="title">{videoSectionData?.section_title}</div>
                    <div className="operation">
                        <span>评价</span>
                        <span>分享</span>
                        <span>用手机看</span>
                        <span>咨询老师</span>
                        <span>投诉</span>
                        {userData ? (
                            <span className="avatar">
                                <img src={userData.avatar} alt="" />
                            </span>
                        ) : ''}
                    </div>
                </div>
                <div className="video">
                    <video controls />
                </div>
            </div>
        </>
    );
}

export default connect((state: RootState) => state)(Video)