// let num:Number = 3
// console.log(num)

import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
    ctx.body = 'server'
})

app.use(router.routes())
app.listen(7001, () => {
    console.log("server start at localhost:7001")
})
