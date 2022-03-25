

import { duration2string, ts2string } from "@/libs/common";
import React, { useState } from "react";
import { connect, actions, Dispatch, RootState, CourseState } from '@/store/index'

interface Props {
    course_id: number;
    cover: string;
    items: {
        ID: number;
        type: 'live' | 'video';
        title: string;
        time: number;
    }[];
    course: CourseState
    dispatch: Dispatch;

}
function CourseVideo(props: Props) {
    const { cover, items } = props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cur, setCur] = useState<number>(0);
    const videoSectionData = props.course.videoSectionData;
    const playSection = (sectionID: number) => {
        props.dispatch(actions.course.getVideoSectionData(sectionID))
    }
    return (
        <div className="course-video">
            <div className="video">
                {videoSectionData ? (
                    <video src={videoSectionData.videoLink} controls ></video>
                ) : (
                    <>
                        <div className="cover">
                            <img src={cover} alt="" />
                        </div>

                        <div className="play-cover">
                            <div className="shadow" />
                            <span className="play-btn" onClick={ev => items[0] && playSection(items[0].ID)}>
                                <i className="icon icon-play-w" />
                            </span>
                        </div>
                    </>
                )}</div>

            <div className="video-list-container">
                <dl className="video-list">
                    <dt>课程列表</dt>
                    {items.map((item, index) => (
                        <dd

                            key={index}
                            className={index === cur ? 'active' : ''}
                            onClick={ev => {
                                setCur(index);
                                playSection(items[index].ID)
                            }
                            }
                        >
                            <div className="type">
                                {{ 'live': '直播', 'video': '录播' }[item.type]}
                            </div>
                            <div className="info">
                                <div className="title">{item.title}</div>
                                {item.type === 'live' ? (
                                    <div className="time">{ts2string(item.time * 1000, 'yyyy-MM-dd HH:mm')}</div>
                                ) : (
                                    <div className="time">{duration2string(item.time)}</div>
                                )
                                }
                            </div>
                        </dd>
                    ))}
                </dl>
            </div>
        </div>
    )
}

export default connect((state: RootState) => state)(CourseVideo)