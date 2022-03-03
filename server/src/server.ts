import app from '~/libs/server'
import routers from '~/routers/routers'
import koaStatic from 'koa-static'
import { staticRoot } from '~/config/app'

app.use(routers)
app.use(koaStatic(staticRoot))