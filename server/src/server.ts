import app from '~/libs/server'
import { init as corsInit } from '~/libs/cors'
import routers from '~/routers/routers'
import koaStatic from 'koa-static'
import { staticRoot } from '~/config/app'
import { enableCors } from '~/config/app'
import { error } from './libs/log'
if (enableCors) corsInit(app);

app.use(async (ctx, next) => {
    try {
        await next()
        if (ctx.body === undefined) {
            ctx.status = 404;
            ctx.body = '未找到数据';
        }
    } catch (e: any) {
        if (typeof e.code === 'number') {
            ctx.status = e.code;
            ctx.body = e.msg;
        } else {
            ctx.status = 500;
            ctx.body = '服务器错误，请刷新重试';
            error(e);
        }
    }
})

app.use(routers)
app.use(koaStatic(staticRoot))


