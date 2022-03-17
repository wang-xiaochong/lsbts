import Router from '@koa/router'
import bannerRoutes from './banner/banner'
import categoryRoutes from './category/category'
import courseRoutes from './course/course'
import siteRoutes from './site/site'
import userRoutes from './user/user'

let router = new Router()
// api
router.prefix('/api')
router.get('/getAPI', async ctx => {
    let apis = [{ name: 'banners' }, { name: 'users' }]
    ctx.body = apis
})

router.use(bannerRoutes)
router.use(categoryRoutes)
router.use(courseRoutes)
router.use(siteRoutes)
router.use(userRoutes)

export default router.routes();
