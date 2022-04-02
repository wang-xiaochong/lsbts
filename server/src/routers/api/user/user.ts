
import { SubscribeData } from '@/models/site'
import Router from '@koa/router'
import { ParesPostData,getClientIP } from '~/libs/req'
import { getChapters } from '~/models/course/chapter'
import { getSubscibe, setMySubscribe } from '~/models/subscribe'
import { getUserCheck, getUserAdd, userData, getUserInfo, getUserID, getUserCourseProgressData, getUserPaiedCourse, getUserOrders, getUserUpdate } from '~/models/user'
import {debounce,undebounce} from '~/libs/req'

let router = new Router()

router.prefix('/user')
// usercheck
router.get('/userCheck', async ctx => {
    const openID = ctx.URL.searchParams.get('openID')
    // console.log("openID:",openID)
    if (openID) {
        let ret = await getUserCheck(openID)
        ctx.body = ret
    } else {
        ctx.body = 'NO OPENID';
    }
})
// userupdate
router.post('/update', async ctx => {
    // const ip = getClientIP(ctx);
    // console.log(ip);
    interface Info{
        userdata: userData,
        user_id:number,
    }
     var userInfo = (await ParesPostData(ctx)) as Info;
     
    if(userInfo)
        if(await debounce(String(userInfo.user_id),ctx))  return ;
    
 
    if (userInfo) {
        let ret = await getUserUpdate(userInfo.userdata,userInfo.user_id)
        // let ret = await getUserAdd(userInfo as userData)
        ctx.body = ret
    } else {
        ctx.body = false;
    }
    await undebounce(String(userInfo.user_id));
})
//useradd
router.post('/add', async ctx => {
    // const ip = getClientIP(ctx);
    // console.log(ip);
     interface Info{
        userdata: userData,
        openID:string,
    }
    var userInfo = (await ParesPostData(ctx)) as Info;
   
    if(userInfo)
        if(await debounce(String(userInfo.openID),ctx)) return;
    
    
    if (userInfo) {
        let ret = await getUserAdd(userInfo.userdata,userInfo.openID)
        ctx.body = ret
    } else {
        ctx.body = false;
    }
     await undebounce(String(userInfo.openID));
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
    let ID = await getUserID(ctx.get('token'))
    ctx.body = await getSubscibe(ID);

})

router.post('/setMysubscribe', async ctx => {
    let ID = await getUserID(ctx.get('token'))
    var data = (await ParesPostData(ctx)) as SubscribeData[]
    await setMySubscribe(ID, data);
    ctx.body = 'OK'

})

router.get('/my-progress-info', async ctx => {
    let ID = await getUserID(ctx.get('token'));
    ctx.body = await getUserCourseProgressData(ID);
})
router.get('/my-course-list', async ctx => {
    let ID = await getUserID(ctx.get('token'));
    ctx.body = await getUserPaiedCourse(ID);
})

router.get('/chapters/:courseID', async ctx => {
    let ID = await getUserID(ctx.get('token'));
    let courseID = Number(ctx.params.courseID)
    ctx.body = await getChapters(courseID, ID)
})

router.get('/my-orders', async ctx => {
    let ID = await getUserID(ctx.get('token'));
    ctx.body = await getUserOrders(ID)
})
















export default router.routes()
