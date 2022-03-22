

import React from "react";

interface Props {

}

export default function courseDescription(props:Props) {
    return (

        <div className="course-item course-description" style={{ display: 'none' }}>
            <div className="teachers">
                <div className="title">
                    老师介绍
                </div>
                <ul className="teacher-list">
                    <li>
                        <div className="avatar">
                            <img src="/image/tmp_avatar.jpg" alt="" />
                        </div>
                        <div className="info">
                            <div className="name">萌萌</div>
                            <div className="desc">目前从事在线教育两年的时间，帮助学员提升技术与薪资。给学员进行一对一的问题指导。</div>
                        </div>
                    </li>
                    <li>
                        <div className="avatar">
                            <img src="/image/tmp_avatar.jpg" alt="" />
                        </div>
                        <div className="info">
                            <div className="name">萌萌</div>
                            <div className="desc">目前从事在线教育两年的时间，帮助学员提升技术与薪资。给学员进行一对一的问题指导。</div>
                        </div>
                    </li>
                    <li>
                        <div className="avatar">
                            <img src="/image/tmp_avatar.jpg" alt="" />
                        </div>
                        <div className="info">
                            <div className="name">萌萌</div>
                            <div className="desc">目前从事在线教育两年的时间，帮助学员提升技术与薪资。给学员进行一对一的问题指导。</div>
                        </div>
                    </li>
                    <li>
                        <div className="avatar">
                            <img src="/image/tmp_avatar.jpg" alt="" />
                        </div>
                        <div className="info">
                            <div className="name">萌萌</div>
                            <div className="desc">目前从事在线教育两年的时间，帮助学员提升技术与薪资。给学员进行一对一的问题指导。</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="summary">
                <div className="label">简　　介</div>
                <div className="value">
                    Spring Cloud是一系列框架的有序集合。它利用Spring Boot的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用Spring Boot的开发风格做到一键启动和部署。<br />
                    如果需要获取更多相关内容视频或资料请添加萌萌老师qq：xxxxxxxx
                </div>
            </div>
            <div className="detail">
                <img src="/image/tmp_course_desc_1.jpg" alt="" />
            </div>
        </div>
    )
}