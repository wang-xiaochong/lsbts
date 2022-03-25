import React from 'react';

interface Props {

}

export default function CourseTabs(props: Props) {
  return (
    <div className="course-tabs">
      <div className="tab active">
        <div className="title">
          阿里微服务架构Spring Cloud Alibaba实战全过程
                </div>
        <div className="expires">2025-06-24到期</div>
      </div>
      <div className="tab">
        <div className="title">
          阿里微服务架构Spring Cloud Alibaba实战全过程
                </div>
        <div className="expires">2025-06-24到期</div>
        <div className="progress">
          <div className="progress-bar">
            <div className="bar" style={{ width: '62%' }} />
          </div>
          <div className="text">已学习62%</div>
        </div>
      </div>
      <div className="tab">
        <div className="title">
          阿里微服务架构Spring Cloud Alibaba实战全过程
                </div>
        <div className="expires">2025-06-24到期</div>
        <div className="progress">
          <div className="progress-bar">
            <div className="bar" style={{ width: '62%' }} />
          </div>
          <div className="text">已学习62%</div>
        </div>
      </div>
    </div>
  );
}