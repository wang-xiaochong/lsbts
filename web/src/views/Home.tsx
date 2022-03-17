import React from 'react';
import { useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'
import Header from '@/commponents/header/header'
import Banner from '@/commponents/index/banner'
import Subscribe from '@/commponents/index/subscribe'
import CourseList from '@/commponents/courseList'
import Alert from '@/commponents/alert';


import { setAppData, AppData } from 'models/app';
import querystring from '@/libs/querystring';
import { AppState, RootState } from '@/store/index'
import { getUserData, saveToken, setToken } from '@/store/actions/user'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { getAllSubscribeData } from '@/store/actions/site';
import { UserState } from '@/store/modules/user';
import { SiteState } from '@/store/modules/site';
import HotTopic from '@/commponents/footer/hotTopic';
import Footer from '@/commponents/footer/footer';


interface Props {
  appData?: AppData;
  app?: AppState;
  user: UserState;
  site: SiteState;
  dispatch: Dispatch;
}

function Home(props: Props) {
  props.appData && setAppData(props.appData);

  useEffect(() => {
    const { token } = querystring(['token']);
    if (token) {
      // console.log(token)
      props.dispatch(saveToken({ token }))
      props.dispatch(setToken({ token }))
      window.location.href = '/';
    }
  });
  useEffect(() => {
    const { user } = props
    if (user.token) {
      props.dispatch(getUserData())
    }
  })
  useEffect(() => {
    const { site } = props
    if (!site.SubscribeData) {
      props.dispatch(getAllSubscribeData())
    }
  })

  return (
    <div>
      <Header />
      <Banner />
      <Subscribe />
      <CourseList />

      <div className='all-course page'>
        <a href='/list'>查看全部课程 &gt;</a>
      </div>
      

      <HotTopic />
      <Footer />

      <Alert />
    </div>
  );
}

export default connect((state: RootState) => {
  return state
})(Home);

// export function render() {
//   return ReactDOMServer.renderToString(<App />)
//   // return ReactDOMServer.renderToStaticMarkup(<App/>)
// }
