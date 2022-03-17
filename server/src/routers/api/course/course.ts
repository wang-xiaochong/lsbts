
import Router from '@koa/router'
import { assert } from '~/libs/common'
import { getCourseSummaryByCategory } from '~/models/course'
let router = new Router()
// course
router.prefix('/course')
router.get('/index-course-list', async ctx => {
    const { category } = ctx.query;
    if (typeof (category) === 'string') {
        ctx.body = await getCourseSummaryByCategory(parseInt(category), 1)
    }
})

//


export default router.routes()
