// import { CategoryData } from 'models/category';
import React from 'react';
import { Link } from 'react-router-dom';
import Category from './category'
import Searchbar from './searchbar'
import User from './user'

interface Props {
  // categories: CategoryData[]
}

export default function Header(props: Props) {
  return (
    <div className="g-header">
      <div className="page">
        <div className="left">
          <Logo />
          {/* <Category categories={props.categories} /> */}
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
    <Link to='/'>
      <h1 className="logo">
        腾讯课堂
      </h1>
    </Link>
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

