import React from 'react';
// import { useState, useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'
// import logo from '../logo.svg';

// import { getAllBanners } from '../models/banner'
// import { BannerData } from 'models/banner'

// import Login from '../commponents/login'
import Header from '@/commponents/header/header'
import Banner from '@/commponents/index/banner'
// import { CategoryData } from 'models/category';
import { setAppData, AppData } from 'models/app';

import querystring from '@/libs/querystring';
import store from '@/store/store'
import { saveToken } from '@/store/actions'

interface Props {
  // categories: CategoryData[]
  appData?: AppData
}

function App(props: Props) {
  props.appData && setAppData(props.appData);
  const { token } = querystring(['token']);
  if (token) {
    // console.log(token)
    store.dispatch(saveToken({ token }))
    // window.location.href = '/';
  }

  

  // const [banners, setBanners] = useState<BannerData[]>([]);
  // useEffect(() => {
  //   (async () => {
  //     let banners = await getAllBanners()
  //     setBanners(banners)
  //   })();
  // }, [])
  // console.log(banners)

  return (
    <div>
      {/* <Login /> */}
      {/* <Header categories={props.categories} /> */}
      <Header />
      <Banner />
    </div>

    // <div>
    //   {/* aaa */}
    //   <ul>
    //     {banners.map(banner =>
    //       <li key={banner.ID}>{banner.href}</li>
    //     )}
    //   </ul>
    // </div>
  );
}

export default App;

// export function render() {
//   return ReactDOMServer.renderToString(<App />)
//   // return ReactDOMServer.renderToStaticMarkup(<App/>)
// }
