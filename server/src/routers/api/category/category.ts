
import Router from '@koa/router'
import { getCategory } from '~/models/category'

let router = new Router()
// category
router.prefix('/category')
router.get('/getCategories', async ctx => {
    let categories = await getCategory();
        ctx.body = categories
})

export default router.routes()
