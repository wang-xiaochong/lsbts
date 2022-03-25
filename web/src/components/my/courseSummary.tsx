import React from 'react';

interface Props {

}

export default function CourseSummary(props: Props) {
  return (
    <div className="heading">
      <div className="class-name">
        班级：微服务架构
                </div>
      <div className="info">
        <span>学习进度：2%</span>
        <span className="split">|</span>
        <span>评价</span>
        <span className="split">|</span>
        <span>联系老师</span>
        <span className="split">|</span>
        <span>加群讨论</span>
      </div>
    </div>
  );
}