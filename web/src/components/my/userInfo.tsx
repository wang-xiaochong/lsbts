import React from 'react';

interface Props {
  points: number;
  todayStudySecs: number;
  pointRank: number;
}

export default function UserInfo(props: Props) {
  const { points, todayStudySecs, pointRank } = props

  let studyMins = Math.round(todayStudySecs / 60);
  let awardPoints = Math.min(30, Math.round(studyMins / 5))
  return (
    <div className="user-info">
      <div className="info">
        累积积分{points}，可兑换余额{(points / 100).toFixed(2)}
        <a href="/">兑换奖励</a>
        <a href="/" className="desc">积分规则</a>
      </div>
      <div className="today">
        <div className="column">
          <div className="title">今天上课</div>
          <div className="value"><b>{studyMins}</b>分钟</div>
        </div>
        <div className="column">
          <div className="title">获得积分</div>
          <div className="value"><b>{awardPoints}</b>分</div>
        </div>
        <div className="column">
          <div className="title">高于平台</div>
          <div className="value"><b>{Math.round(pointRank * 100)}%</b>学员</div>
        </div>
      </div>
    </div>
  );
}