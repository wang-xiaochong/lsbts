
import { SearchParams } from '@/models/course'
import Router from '@koa/router'
import { ParesPostData } from '~/libs/req'
import { getCourseDetail, getCourseSummaryByCategory, getVideoSection } from '~/models/course'
import { getAdCourse, getSearchCategoryOptions, searchCourse } from '~/models/search'
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
router.get('/ad', async ctx => {
    const { type } = ctx.query;
    let data;
    if (type === 'right' || type === 'bottom')
        data = await getAdCourse(type)
    ctx.body = { type, data }

})

router.get('/detail/:courseID', async ctx => {
    const courseID = Number(ctx.params.courseID)
    let data = await getCourseDetail(courseID)
    ctx.body = data
})

router.get('/video-section/:sectionID', async ctx => {
    const sectionID = Number(ctx.params.sectionID);
    ctx.body = await getVideoSection(sectionID)
})






export default router.routes()
