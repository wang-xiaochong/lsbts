import React from 'react';
import { useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'
import Header from '@/commponents/header/header'
import Banner from '@/commponents/index/banner'

import { setAppData, AppData } from 'models/app';
import querystring from '@/libs/querystring';
import { RootState } from '@/store/index'
import { getUserData, saveToken, setToken } from '@/store/actions/user'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';

interface Props {
  appData?: AppData;
  token?: string;
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
    const { token } = props
    if (token) {
      props.dispatch(getUserData())

    }
  })


  return (
    <div>
      {/* <Login /> */}
      {/* <Header categories={props.categories} /> */}
      <Header />
      <Banner />
    </div>
  );
}

export default connect((state: RootState) => {
  return state.user
})(Home);

// export function render() {
//   return ReactDOMServer.renderToString(<App />)
//   // return ReactDOMServer.renderToStaticMarkup(<App/>)
// }
