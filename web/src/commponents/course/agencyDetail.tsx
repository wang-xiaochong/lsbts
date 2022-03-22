import React from "react";


interface Props {

}
export default function agencyDetail(props:Props) {
    return (
        <div className="agency-detail">
            <div className="desc">
                <div className="agency-title">
                    <div className="img">
                        <img src="/image/tmp_avatar.jpg" alt="" />
                    </div>
                    <div className="title">
                        xxx学院
                    </div>
                </div>
                <div className="agency-info">
                    <div className="info">
                        <div className="title">好评度</div>
                        <div className="value">94%</div>
                    </div>
                    <div className="info">
                        <div className="title">课程数</div>
                        <div className="value">80</div>
                    </div>
                    <div className="info">
                        <div className="title">学习人次</div>
                        <div className="value">60万</div>
                    </div>
                </div>
                <div className="agency-desc">
                    xxx学院致力发展在线教育，打造一流的优质服务，成就一线的城市人才，专注于互联网、区块链、大数据、人工智能技术的研究。讲师团队均来自于互联网公司，拥有5年线下的培训经验，企业经验丰富实力派老师，可以真正帮助学员快速提升能力。我们的教学理念是：学以致用，所学即为所用！让学习成为一种习惯~
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