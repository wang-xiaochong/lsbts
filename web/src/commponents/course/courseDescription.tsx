

import { TeacherData } from "models/course";
import React from "react";

interface Props {
    teachers: TeacherData[];
    summary: string;
    description: string;
}

export default function courseDescription(props: Props) {

    const { teachers, summary, description } = props;

    return (
        <div className="course-item course-description" >
            <div className="teachers">
                <div className="title">
                    老师介绍
                </div>
                <ul className="teacher-list">
                    {teachers.map(item => (
                        <li key={item.ID}>
                            <div className="avatar">
                                <img src={item.avatar} alt="" />
                            </div>
                            <div className="info">
                                <div className="name">{item.title}-{item.name}</div>
                                <div className="desc">{item.summary}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="summary">
                <div className="label">简　　介</div>
                <div className="value">
                    {summary}
                </div>
            </div>
            <div className="detail">
                {/* <img src="/image/tmp_course_desc_1.jpg" alt="" /> */}
                {description}
            </div>
        </div>
    )
}