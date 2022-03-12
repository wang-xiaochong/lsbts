import React from 'react';
import { useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'

// import Login from '../commponents/login'
import Header from '@/commponents/header/header'
import Banner from '@/commponents/index/banner'

import { setAppData, AppData } from 'models/app';
import querystring from '@/libs/querystring';
import store from '@/store/store'
import { saveToken } from '@/store/actions'

import { connect } from 'react-redux'

interface Props {
  appData?: AppData;
  token?: string;
}

function Home(props: Props) {
  props.appData && setAppData(props.appData);
  useEffect(() => {
    const { token } = querystring(['token']);
    if (token) {
      // console.log(token)
      store.dispatch(saveToken({ token }))
      window.location.href = '/';
    }
  });

  useEffect(() => {
    const { token } = props
    if (token) {
      console.log(token)
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

export default connect((state) => {
  // console.log(state)
  return state
})(Home);

// export function render() {
//   return ReactDOMServer.renderToString(<App />)
//   // return ReactDOMServer.renderToStaticMarkup(<App/>)
// }
