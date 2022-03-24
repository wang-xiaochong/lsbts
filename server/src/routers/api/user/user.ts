
import { SubscribeData } from '@/models/site'
import Router from '@koa/router'
import { ParesPostData } from '~/libs/req'
import { getSubscibe, setMySubscribe } from '~/models/subscribe'
import { getUserCheck, getUserAdd, userData, getUserInfo, getUserID } from '~/models/user'

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
        if (ret) {
            ctx.body = ret
        } else {
            ctx.status = 404;
            ctx.body = 'Not Found'
        }

    } else {
        ctx.body = '';
    }
})

router.get('/mysubscribe', async ctx => {
    // let ID = await getUserID(ctx.get('token'))
    ctx.body = await getSubscibe(1);

})

router.post('/mysubscribe', async ctx => {
    let ID = await getUserID(ctx.get('token'))
    var data = (await ParesPostData(ctx)) as SubscribeData[]
    await setMySubscribe(ID, data);
    ctx.body = 'OK'

})










export default router.routes()
