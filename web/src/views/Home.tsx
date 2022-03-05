import React from 'react';
// import { useState, useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'
// import logo from '../logo.svg';
import '../App.css';
// import { getAllBanners } from '../models/banner'
// import { BannerData } from 'models/banner'

// import Login from '../commponents/login'
import Header from '@/commponents/header/header'
import { CategoryData } from 'models/category';
import { setAppData, AppData } from 'models/app';

interface Props {
  // categories: CategoryData[]
  appData?: AppData
}

function App(props: Props) {
  props.appData && setAppData(props.appData);
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
    </div>



    // <div>
    //   {/* aaa */}
    //   <ul>
    //     {banners.map(banner =>
    //       <li key={banner.ID}>{banner.href}</li>
    //     )}
    //   </ul>
    // </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

// export function render() {
//   return ReactDOMServer.renderToString(<App />)
//   // return ReactDOMServer.renderToStaticMarkup(<App/>)
// }
