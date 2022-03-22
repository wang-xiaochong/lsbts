
import { SearchParams } from '@/models/course'
import Router from '@koa/router'
import { ParesPostData } from '~/libs/req'
import { getCourseSummaryByCategory } from '~/models/course'
import { getSearchCategoryOptions, searchCourse } from '~/models/search'
let router = new Router()
// course
router.prefix('/course')
router.get('/index-course-list', async ctx => {
    const { category } = ctx.query;
    if (typeof (category) === 'string') {
        ctx.body = await getCourseSummaryByCategory(parseInt(category), 1)
    }
})

router.get('/get-category-options', async ctx => {
    let category = ctx.query.category ? Number(ctx.query.category) : 0;
    let category_level = ctx.query.category_level ? Number(ctx.query.category_level) : 0;
    if (category && category_level)
        ctx.body = await getSearchCategoryOptions(category, category_level);
    else
        ctx.body = [];
});

router.post('/search', async ctx => {
    var data = (await ParesPostData(ctx)) as SearchParams
    ctx.body = await searchCourse(data);
})

//


export default router.routes()
