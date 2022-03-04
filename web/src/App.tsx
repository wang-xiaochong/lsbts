import React from 'react';
// import ReactDOMServer from 'react-dom/server'
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  axios('http://localhost:7001/api/getusers', {
    headers:{a:12}
  }).then(res => {
    console.log(res)
  })


  return (
    <div>
      aaa
    </div>
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
