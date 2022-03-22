

import React, { useState } from "react";

import * as routers from '../../router'

interface Props {
    course_id: number;
    cover: string;
    items: {
        type: 'live' | 'video';
        title: string;
        time: number;
    }[];


}
export default function courseVideo(props: Props) {
    const { cover, items } = props

    const [cur, setCur] = useState<number>(0);

    return (
        <div className="course-video">
            <div className="video">
                <div className="cover">
                    <img src={cover} alt="" />
                </div>
                <div className="play-cover">
                    <div className="shadow" />
                    <a href={routers.video(0)} className="play-btn">
                        <i className="icon icon-play-w" />
                    </a>
                </div>
            </div>
            <div className="video-list-container">
                <dl className="video-list">
                    <dt>课程列表</dt>
                    {items.map((item, index) => (
                        <dd className={index === cur ? 'active' : ''}>
                            <div className="type">
                                {{ 'live': '直播', 'video': '录播' }[item.type]}
                            </div>
                            <div className="info">
                                <div className="title">{item.title}</div>
                                <div className="time">{item.time < 60 ? `${item.time}秒` : `${Math.round(item.time / 60)}分钟`}</div>
                            </div>
                        </dd>
                    ))}
                </dl>
            </div>
        </div>
    )
}