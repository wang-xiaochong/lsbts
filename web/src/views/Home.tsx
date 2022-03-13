import React from 'react';
import { useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'
import Header from '@/commponents/header/header'
import Banner from '@/commponents/index/banner'

import { setAppData, AppData } from 'models/app';
import querystring from '@/libs/querystring';
import store, { RootState } from '@/store/index'
import { saveToken, setToken } from '@/store/actions/user'
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
      store.dispatch(setToken({ token }))
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

export default connect((state:RootState) => {
  return state.user
})(Home);

// export function render() {
//   return ReactDOMServer.renderToString(<App />)
//   // return ReactDOMServer.renderToStaticMarkup(<App/>)
// }
