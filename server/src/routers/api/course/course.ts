
import Router from '@koa/router'
import { assert } from '~/libs/common'
import { getCourseSummaryByCategory } from '~/models/course'

let router = new Router()
// course
router.prefix('/course')
router.get('/index-course-list', async ctx => {
    // const { category } = ctx.query;
    // if (category) {
        ctx.body = await getCourseSummaryByCategory(0 , 1)
    // } else {
        // assert(!category,404,'无categoryID')
    // }

    })


export default router.routes()
