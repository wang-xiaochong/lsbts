
import { ts2string } from "@/libs/common";
import { CourseCommentData } from "models/course";
import React, { useState } from "react";

interface Props {
    comments: CourseCommentData[]

}
export default function CourseCommont(props: Props) {
    let { comments } = props
    const [filter, setFilter] = useState(0);
    comments = comments.filter(comment => {
        switch (filter) {
            case 0: return true;
            case 1: return comment.rank >= 4;
            case 2: return comment.rank >= 2 && comment.rank <= 3;
            default: return comment.rank === 1;
        }

    })

    return (
        <div className="course-item course-comment">
            <CommentFilter comments={props.comments} onChange={setFilter} />
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
                                    let h = Math.round(m / 60);
                                    m %= 60;

                                    return `${h}小时${m}分钟`;
                                })()}时评价</span>
                                <span className="time">{(() => {
                                    return ts2string(comment.time * 1000, 'yyyy-MM-dd');
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
        arr.push(<i key={i} className={`icon ${i <= rank ? 'icon-star-yellow' : 'icon-star-grey'}`} />)
    }
    return (
        <div className="rank">
            {arr}
        </div>
    )
}

interface CommentFilterProps {
    comments: CourseCommentData[];
    onChange: (index: number) => void;
}
function CommentFilter(props: CommentFilterProps) {
    const { comments, onChange } = props
    const [cur, setCur] = useState(0);


    let arr = [];
    // 全部
    arr.push(`全部评价(${comments.length})`)

    // 好评
    arr.push(`好评(${comments.filter(item => item.rank >= 4).length})`)
    arr.push(`中评(${comments.filter(item => item.rank >= 2 && item.rank <= 3).length})`)
    arr.push(`差评(${comments.filter(item => item.rank === 1).length})`)

    return (
        <div className="comment-filter">
            {arr.map((str, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        checked={cur === index}
                        onChange={ev => {
                            if (ev.target.checked) {
                                setCur(index);
                                onChange(index)
                            }
                        }}
                    />
                    {str}
                </label>
            ))}
        </div>
    )
}