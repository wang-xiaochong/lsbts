import React from 'react';

import { UserOrderData } from '@/models/user';

import { ts2string } from '../../libs/common';

interface Props {
  items: UserOrderData[];
}

export default function CourseTable(props: Props) {
  const { items } = props;
  return (
    <div className="order-table">
      <div className="table-header">
        <div className="header-title">课程订单</div>
        <div className="header-price">价格</div>
        <div className="header-status">状态</div>
        <div className="header-operation">操作</div>
      </div>
      {items.map(item => (
        <div key={item.ID} className="course">
          <div className="header">
            <div className="time">{ts2string(item.time * 1000, 'yyyy-MM-dd')}</div>
            <div className="name">{item.agency_name}</div>
          </div>
          {item.courses.map(course => (
            <div key={course.ID} className="body">
              <div className="detail">
                <div className="cover">
                  <img src={course.cover} alt="" />
                </div>
                <div className="info">
                  <div className="title">{course.title}</div>
                  <div className="sub">{course.className}</div>
                </div>
              </div>
              <div className="price">{course.price ? `￥${course.price.toFixed(2)}` : '免费'}</div>
              <div className="status">{(() => {
                switch (course.status) {
                  case 'init': return '等待付款';
                  case 'success': return '报名成功';
                  case 'canceled': return '订单取消';
                }
              })()}</div>
              <div className="operation">
                <span className="btn">取消报名</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}