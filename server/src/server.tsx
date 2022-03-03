import React from 'react'
import ReactDomServer from 'react-dom/server'
import Router from '@koa/router'
import App from '@/App'
import app from '~/libs/server'
// import koaStatic from 'koa-static'
import fs from 'fs'

const router = new Router()

let index = fs.readFileSync('index.html').toString()

// 服务端进行渲染
router.get('/', async ctx => {
    let str = ReactDomServer.renderToString(<App />)
    ctx.body = index.replace('<div id=root></div>', `<div id=root>${str}</div>`)
})

app.use(router.routes())
// app.use(koaStatic(__dirname))