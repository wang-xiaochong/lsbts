// import { CategoryData } from 'models/category';
import React from 'react';
import { Link } from 'react-router-dom';
import Category from './category'
import Searchbar from './searchbar'
import User from './user'
import * as routers from '@/router'

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
    <Link to={routers.home()}>
      <h1 className="logo">
        小帅课堂
      </h1>
    </Link>
  )
}

const Links = () => {
  return (
    <>
      <a className="btn" href={routers.develop()}>入驻/合作</a>
      <a className="btn" href={routers.develop()}>急速版</a>
      <a className="btn" href={routers.develop()}>客户端</a>
      <a className="btn" href={routers.develop()}>私信</a>
    </>
  )
}

