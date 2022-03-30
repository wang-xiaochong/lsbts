import React, { useEffect, useRef, useState } from 'react';

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

    const [headerVisible, setHeaderVisible] = useState(true)
    const params = useParams<{ sectionID: string }>();
    const sectionID = Number(params.sectionID)
    if (props.app?.globalHeaderVisible !== false) props.dispatch(actions.app.setHeaderVisible(false))
    if (props.app?.globalFooterVisible !== false) props.dispatch(actions.app.setFooterVisible(false))
    if (!videoSectionData) props.dispatch(actions.course.getVideoSectionData(sectionID))

    // video
    const divRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    function onResize() {
        let div = divRef.current;
        let video = videoRef.current;

        let W = document.documentElement.clientWidth;
        let H = document.documentElement.clientHeight;

        if (div && video) {
            div.style.width = W + 'px';
            div.style.height = H + 'px';

            let ratio = video.videoWidth / video.videoHeight;

            if (ratio > W / H) {
                video.style.width = W + 'px'
                video.style.height = 'auto'
                let h = W * video.videoHeight / video.videoWidth;
                video.style.left = '0'
                video.style.top = (H - h) / 2 + 'px'
            } else {
                video.style.width = 'auto'
                video.style.height = H + 'px'
                let w = H * video.videoWidth / video.videoHeight;
                video.style.top = '0'
                video.style.left = (W - w) / 2 + 'px'
            }
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        onResize();
        return () => {
            window.addEventListener('resize', onResize, false)
            document.body.style.overflow = 'visible'
        }
    })

    useEffect(() => {
        let video = videoRef.current;
        if (video) {
            video.addEventListener('play', onPlay, false)
            video.addEventListener('pause', onStop, false)
            video.addEventListener('canplay', onResize, false)
        }
        function onPlay() {
            setHeaderVisible(false)
        }
        function onStop() {
            setHeaderVisible(true)
        }
        return () => {
            if (video) {
                video.removeEventListener('play', onPlay, false)
                video.removeEventListener('pause', onStop, false)
                video.removeEventListener('canplay', onResize, false)
            }
        }
    })

    const addProgress = () => {
        props.dispatch(actions.course.addMyProgress(sectionID))
    }

    return (
        <>
            <a href={routers.home()}>返回首页</a>
            <button onClick={addProgress}>增加</button>
            <div className="video-player">
                {headerVisible ? (<div className="header">
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
                </div>) : ''}

                <div className="video" ref={divRef}>
                    <video ref={videoRef} controls src={videoSectionData?.videoLink} />
                </div>
            </div>
        </>
    );
}

export default connect((state: RootState) => state)(Video)