// require没有类型信息 node中的js是不认ts的
// const Koa = require('koa')
// import有类型信息，支持ts
import Koa from 'koa';
import {port} from '~/config/server'

import https from 'https'
import fs from 'fs'

const sslify = require('koa-sslify').default;//http强制HTTPS


const app = new Koa();
app.use(sslify());

var options = {
    key: fs.readFileSync('./private_key.pem'),
    cert: fs.readFileSync( './ca-cert.pem')
}

https.createServer(options, app.callback()).listen(port, () => {
    console.log(`server start at localhost:${port}`)
})


// app.listen(port,
//     () => {console.log(`server start at localhost:${port}`);}
// )

export default app