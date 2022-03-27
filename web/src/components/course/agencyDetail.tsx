import React from "react";


interface Props {
    avatar: string;
    agency_name: string;
    agency_rank: number;
    total_course: number;
    total_students: number;
    summary: string;
}
export default function agencyDetail(props: Props) {

    const { avatar, agency_name, agency_rank, total_course, total_students, summary } = props



    return (
        <div className="agency-detail">
            <div className="desc">

                <div className="agency-title">
                    <div className="img">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="title">
                        {agency_name}
                    </div>
                </div>

                <div className="agency-info">
                    <div className="info">
                        <div className="title">好评度</div>
                        <div className="value">{Math.round(agency_rank * 100)}%</div>
                    </div>
                    <div className="info">
                        <div className="title">课程数</div>
                        <div className="value">{total_course}</div>
                    </div>
                    <div className="info">
                        <div className="title">学习人次</div>
                        <div className="value">{total_students >= 10000 ? `${Math.round(total_students / 10000)}万` : total_students}</div>
                    </div>
                </div>
                <div className="agency-desc">
                    {summary}
                </div>
            </div>

            <div className="course-list-sm">
                <div className="title">关联的付费课程</div>
                <div className="course-detail">
                    <div className="cover">
                        <img src="/image/tmp_course_1.jpg" alt="" />
                    </div>
                    <div className="title">
                        【VIP严选课程】JAVA互联网架构师专题/分布式/高并发/微服务
                    </div>
                    <div className="info">
                        <span className="price">￥8980.00</span>
                        <span className="students">13093人购买</span>
                    </div>
                    <div className="btn">
                        立即查看
                    </div>
                </div>
            </div>

        </div>
    )
}