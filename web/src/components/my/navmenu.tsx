import React from 'react';

import * as routers from '@/router'
interface Props {

}

export default function NavMenu(props: Props) {
  const menus = [
    { title: '课程表', href: routers.my() },
    { title: '全部订单', href: routers.myOrder() },
    { title: '分期付款', href: '' },
    { title: '收藏', href: '' },
    { title: '优惠券', href: '' },
    { title: '我的余额', href: '' },
    { title: '课程分销', href: '' },
    { title: '个人信息', href: '' },
    { title: '课程兑换', href: '' },
  ]


  return (
    <div className="nav-menu">
      <ul>
        {menus.map((menu,index) => (
          <li key={index} className={menu.href === window.location.pathname ? 'active' : ''}>
            <a href={menu.href}>{menu.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}