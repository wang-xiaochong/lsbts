
import Router from '@koa/router'

import { getAllBanners } from '~/models/banner'
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

// searchKey
router.get('/getSuggest/:kw', async ctx => {
    const {kw} = ctx.params
    let searchKeyWords = await getSuggest(kw)
    ctx.body = searchKeyWords
})
// banners
router.get('/getAllBanners', async ctx => {
    let banners = await getAllBanners()
    ctx.body = banners
})



export default router.routes()
