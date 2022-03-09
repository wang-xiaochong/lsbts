
import Router from '@koa/router'
import { ParesPostData } from '~/libs/req'
import { getUserCheck, getUserAdd, userData } from '~/models/user'

let router = new Router()

router.prefix('/user')
// usercheck
router.get('/userCheck', async ctx => {
    const nickname = ctx.URL.searchParams.get('nickname')
    if (nickname) {
        // console.log(nickname)
        let ret = await getUserCheck(nickname)
        ctx.body = ret
    } else {
        ctx.body = { token: '' };
    }

})

router.post('/userAdd', async ctx => {
    var userInfo = await ParesPostData(ctx)
    if (userInfo) {
        let ret = await getUserAdd(userInfo as userData)
        ctx.body = ret
    } else {
        ctx.body = false;
    }
})

export default router.routes()
