import React from 'react';

interface Props {
  ClassName: string;
  progress: number;
}

export default function CourseSummary(props: Props) {

  const { ClassName, progress } = props;


  return (
    <div className="heading">
      <div className="class-name">班级：{ClassName}</div>
      <div className="info">
        <span>学习进度：{Math.round(progress * 100)}%</span>
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