import React from "react";


interface Props {

}
export default function courseInfo(props:Props) {
    return (

        <div className="course-info">
            <div className="info">
                <div className="title">
                    阿里微服务架构Spring Cloud Alibaba实战全过程
                    <span className="price">免费</span>
                </div>
                <div className="info">
                    <span className="desc">最近在学</span>
                    <span className="desc">679人</span>
                    <span className="split" />
                    <span className="desc">累计报名</span>
                    <span className="desc">3457人</span>
                    <span className="split" />
                    <span className="desc">好评度</span>
                    <span className="desc">50%</span>
                    <span className="split">|</span>
                    <span className="desc">咨询老师</span>
                    <span className="desc">分享</span>
                    <span className="desc">用手机看</span>
                </div>
            </div>
            <div className="operation">
                <button className="btn-active">报名</button>
                <button className="btn-disable">已报名</button>
            </div>
        </div>
    )
}