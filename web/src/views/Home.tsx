import React from 'react';
import { useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'
import Header from '@/commponents/header/header'
import Banner from '@/commponents/index/banner'
import Subscribe from '@/commponents/index/subscribe'

import { setAppData, AppData } from 'models/app';
import querystring from '@/libs/querystring';
import { RootState } from '@/store/index'
import { getUserData, saveToken, setToken } from '@/store/actions/user'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { getSubscribeData } from '@/store/actions/site';
import { UserState } from '@/store/modules/user';
import { SiteState } from '@/store/modules/site';

interface Props {
  appData?: AppData;
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
      props.dispatch(getSubscribeData())
    }
  })


  return (
    <div>
      {/* <Login /> */}
      {/* <Header categories={props.categories} /> */}
      <Header />
      <Banner />
      <Subscribe />
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
