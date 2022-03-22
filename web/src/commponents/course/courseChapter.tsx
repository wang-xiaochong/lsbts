import { CourseChapterData, LiveData, VideoData } from "models/course";
import React from "react";



interface Props {

    chapters: CourseChapterData[];

}
export default function courseChapter(props: Props) {
    const { chapters } = props;

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
                                <div className="task">
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
                                            <span className="task-duration">({
                                                (() => {
                                                    let { start_time } = (section.item as LiveData)
                                                    let date = new Date(start_time * 1000);
                                                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                                                })()
                                            })</span>
                                        ) : (section.type === 'video' ? (
                                            <span className="task-duration">({
                                                (() => {
                                                    let s = (section.item as VideoData).duration;
                                                    if (s < 60) return s + '秒';
                                                    else return Math.floor(s / 60) + '分钟';
                                                })()
                                            })</span>
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