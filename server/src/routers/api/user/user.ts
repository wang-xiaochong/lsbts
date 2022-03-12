
import Router from '@koa/router'
import { ParesPostData } from '~/libs/req'
import { getUserCheck, getUserAdd, userData, getUserInfo } from '~/models/user'

let router = new Router()

router.prefix('/user')
// usercheck
router.get('/userCheck', async ctx => {
    const nickname = ctx.URL.searchParams.get('nickname')
    if (nickname) {
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

router.get('/getUserInfo', async ctx => {
    const token = ctx.get('token')
    // const token = ctx.URL.searchParams.get('token')
    if (token) {
        let ret = await getUserInfo(token)
        ctx.body = ret
    } else {
        ctx.body = '';
    }
})






export default router.routes()
