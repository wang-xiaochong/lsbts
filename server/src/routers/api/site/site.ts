
import Router from '@koa/router'
import { getCategory } from '~/models/category'
import { getSuggest } from '~/models/search'

let router = new Router()

router.prefix('/site')
// category
router.get('/getCategories', async ctx => {
    let categories = await getCategory();
        ctx.body = categories
})
//hotKeyWords
router.get('/getHotKeyWords', async ctx => {
    let hotKeyWords = await getSuggest('')
    ctx.body = hotKeyWords
})



export default router.routes()
