
import { CourseCommentData } from "models/course";
import React from "react";

interface Props {
    comments: CourseCommentData[]

}
export default function courseCommont(props: Props) {
    const { comments } = props


    return (
        <div className="course-item course-comment">
            <div className="comment-filter">
                <label>
                    <input type="radio" defaultChecked />
                    全部评价(2)
                </label>
                <label>
                    <input type="radio" />
                    好评(1)
                </label>
                <label>
                    <input type="radio" />
                    中评(1)
                </label>
                <label>
                    <input type="radio" />
                    差评(0)
                </label>
            </div>
            <ul className="comment-list">
                {comments.map(comment => (
                    <li key={comment.ID}>
                        <div className="user">
                            <div className="avatar">
                                <img src={comment.avatar} alt="" />
                            </div>
                            <div className="nickname">{comment.nickname}</div>
                        </div>
                        <div className="comment">
                            <Rank rank={comment.rank} />
                            <div className="content">
                                {comment.content}
                            </div>
                            <div className="info">
                                <span>已上课{(() => {
                                    let m = Math.floor(comment.course_time / 60);
                                    let h = Math.fround(m / 60);
                                    m %= 60;

                                    return `${h}小时${m}分钟`;
                                })()}时评价</span>
                                <span className="time">{(() => {
                                    let date = new Date(comment.time * 1000)
                                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                                })()}</span>
                            </div>
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    )
}




interface RankProps {
    rank: number;
}
function Rank(props: RankProps) {
    const { rank } = props;
    let arr = [];
    for (let i = 1; i <= 5; i++) {
        arr.push(<i className={`icon ${i <= rank ? 'icon-star-yellow' : 'icon-star-grey'}`} />)
    }
    return (
        <div className="rank">
            {arr}
        </div>
    )
}