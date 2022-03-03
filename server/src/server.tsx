import app from './libs/server'
import { getAllBanner } from '~/models/banner'

app.use(async ctx => {
    let banners = await getAllBanner();
    ctx.body = banners
})
