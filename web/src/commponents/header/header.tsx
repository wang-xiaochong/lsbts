import React from 'react';
import Category from './category'
import Searchbar from './searchbar'
import User from './user'

export default function Header() {
  return (
    <div className="g-header">
      <div className="page">
        <div className="left">
          <Logo />
          <Category />
          <Searchbar />
        </div>
        <div className="right">
          <Links />
          <User />
        </div>
      </div>
    </div>
  );
};



const Logo = () => {
  return (
    <a href="http://ke.qq.com/">
      <h1 className="logo">
        腾讯课堂
      </h1>
    </a>
  )
}

const Links = () => {
  return (
    <>
      <a className="btn" href="http://ke.qq.com/">入驻/合作</a>
      <a className="btn" href="http://ke.qq.com/">急速版</a>
      <a className="btn" href="http://ke.qq.com/">客户端</a>
      <a className="btn" href="http://ke.qq.com/">私信</a>
    </>
  )
}