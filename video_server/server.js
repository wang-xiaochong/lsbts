const Koa = require('koa')
const Router = require('koa-router')
const { key } = require('./config')
const crypto = require('crypto')

const urlLib = require('url')
const path = require('path')


let app = new Koa();
let router = new Router();

router.get('/video', async ctx => {

    // 校验播放权限
    const url = 'http://1305118209.vod2.myqcloud.com/ddd758e8vodtranscq1305118209/014db012387702298043157236/v.f100010.mp4'
    const duration = 91;
    //签名

    // const { videoID } = ctx.params;

    const t = (Math.floor((Date.now() / 1000) + duration * 2)).toString(16);
    const dir = path.parse(urlLib.parse(url).path).dir + '/'
    const sign = md5(key + dir + t)
    ctx.body = `${url}?t=${t}&sign=${sign}`
})


function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex')
}




app.use(router.routes());
app.listen(9001);

