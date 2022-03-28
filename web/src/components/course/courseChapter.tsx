import { duration2string, ts2string } from "@/libs/common";
import { CourseChapterData, CourseSectionData, LiveData, VideoData } from "models/course";
import React from "react";

import * as routers from '../../router'



interface Props {

    chapters: CourseChapterData[];
    onChange: (sectionID: number) => void;

}
export default function courseChapter(props: Props) {
    const { chapters, onChange } = props;
    const sectionClick = (section: CourseSectionData) => {


        switch (section.type) {
            case 'video': {
                // routers.push(routers.video(section.ID)); break;
                onChange(section.ID)
                alert('请先登录')
                break;
            }
            default: alert('暂不支持')
        }
    }

    return (
        <div className="course-item course-chapter" >
            <ul className="chapter-list">
                {chapters.map((chapter, index) => (
                    <li key={chapter.ID}>
                        <div className="chapter-title">
                            <span className="index">
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <span className="title">{chapter.title}</span>
                        </div>
                        <div className="tasks">
                            {chapter.sections.map(section => (
                                <div className="task"
                                    key={section.ID}
                                    onClick={ev => sectionClick(section)}
                                >
                                    <span className="task-title">【{
                                        {
                                            'live': '直播',
                                            'video': '录播',
                                            'read': '阅读',
                                            'download': '资料',
                                        }[section.type]
                                    }】{section.title}</span>
                                    {
                                        section.type === 'live' ? (
                                            <span className="task-duration">({ts2string((section.item as LiveData).start_time * 1000, 'yyyy-MM-dd')})</span>
                                        ) : (section.type === 'video' ? (
                                            <span className="task-duration">({duration2string((section.item as VideoData).duration)})</span>
                                        ) : '')
                                    }
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}