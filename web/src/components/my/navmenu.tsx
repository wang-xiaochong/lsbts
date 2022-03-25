import React from 'react';

interface Props {

}

export default function NavMenu(props: Props) {
  return (
    <div className="nav-menu">
      <ul>
        <li className="active">课程表</li>
        <li>全部订单</li>
        <li>分期付款</li>
        <li>收藏</li>
        <li>优惠券</li>
        <li>我的余额</li>
        <li>课程分销</li>
        <li>个人信息</li>
        <li>课程兑换</li>
      </ul>
    </div>
  );
}