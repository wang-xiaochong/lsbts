import Router from '@koa/router'
import APIRouters from '~/routers/api/api'
import RenderRouters from '~/routers/render/render'

const router = new Router();

router.use(APIRouters)
router.use(RenderRouters)
router.get('/oauth2.0/me', async ctx => {
    let apis = [{ name: 'banners' }, { name: 'users' }]
    ctx.body = apis
})
export default router.routes();