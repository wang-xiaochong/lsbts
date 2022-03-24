import React from "react";
import { connect, actions, RootState, Dispatch } from '@/store/index'

interface Props {
    course_id: number;
    title: string;
    price: number;
    total_students: number;
    recently_students: number;
    rank: number;
    isRegisted: boolean;
    dispatch: Dispatch;

}
function CourseInfo(props: Props) {

    const { course_id, title, price, total_students, recently_students, rank, isRegisted } = props
    const registerCourse = () => {
        props.dispatch(actions.course.registerCourse(course_id))
    }



    return (

        <div className="course-info">
            <div className="info">
                <div className="title">
                    {title}
                    <span className="price">{price === 0 ? '免费' : `￥${price}`}</span>
                </div>
                <div className="info">
                    <span className="desc">最近在学</span>
                    <span className="desc">{recently_students}人</span>
                    <span className="split" />
                    <span className="desc">累计报名</span>
                    <span className="desc">{total_students}人</span>
                    <span className="split" />
                    <span className="desc">好评度</span>
                    <span className="desc">{Math.round(rank * 100)}%</span>
                    <span className="split">|</span>
                    <span className="desc">咨询老师</span>
                    <span className="desc">分享</span>
                    <span className="desc">用手机看</span>
                </div>
            </div>
            <div className="operation">
                {isRegisted ? (
                    <button className="btn-disable">已报名</button>
                ) : (
                    <button className="btn-active" onClick={registerCourse}>报名</button>
                )}
            </div>
        </div>
    )
}

export default connect((state: RootState) => state)(CourseInfo)