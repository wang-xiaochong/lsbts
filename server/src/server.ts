import app from '~/libs/server'
import routers from '~/routers/routers'
import koaStatic from 'koa-static'
import { staticRoot } from '~/config/app'


console.log(process.env.NODE_ENV)
app.use(routers)
app.use(koaStatic(staticRoot))