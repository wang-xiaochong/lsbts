
import { SearchParams } from '@/models/course'
import Router from '@koa/router'
import { ParesPostData } from '~/libs/req'
import { getCourseSummaryByCategory } from '~/models/course'
import { searchCourse } from '~/models/search'
let router = new Router()
// course
router.prefix('/course')
router.get('/index-course-list', async ctx => {
    const { category } = ctx.query;
    if (typeof (category) === 'string') {
        ctx.body = await getCourseSummaryByCategory(parseInt(category), 1)
    }
})

router.post('/search', async ctx => {
    var data = (await ParesPostData(ctx)) as SearchParams
    ctx.body = await searchCourse(data);
})

//


export default router.routes()
