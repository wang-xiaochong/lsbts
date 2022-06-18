// require没有类型信息 node中的js是不认ts的
// const Koa = require('koa')
// import有类型信息，支持ts
import Koa from 'koa';
import { port } from '~/config/server'

import https from 'https'
import fs from 'fs'
import { isDev } from '~/config/app';

const sslify = require('koa-sslify').default;//http强制HTTPS


const app = new Koa();

if (isDev) {
    app.listen(port,
        () => { console.log(`server start at localhost:${port}`); }
    )
} else {
    app.use(sslify());

    var options = {
        key: fs.readFileSync('src/keys/private_key.pem'),
        cert: fs.readFileSync('src/keys/ca-cert.pem')
    }

    https.createServer(options, app.callback()).listen(port, () => {
        console.log(`server start at localhost:${port}`)
    })
}


export default app