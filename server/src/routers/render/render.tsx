import Router from '@koa/router'
import React from 'react'
import ReactDomServer from 'react-dom/server'
import Home from '@/views/Home'
import path from 'path'
import fs from 'fs'
import { staticRoot } from '~/config/app'
import { getCategory } from '~/models/category'
import { AppData } from '@/models/app'
import { getSuggest } from '~/models/search'
import { getAllBanners } from '~/models/banner'


let router = new Router()

if (process.env.NODE_ENV === 'production') {
    // 服务端进行渲染
    router.get('/', async ctx => {
        let index = fs.readFileSync(path.resolve(staticRoot, 'index.html')).toString()
        let categories = await getCategory()
        let hotKeyWords = await getSuggest('')
        let banners = await getAllBanners()

        let appData: AppData = {
            categories: categories,
            hotKeyWords: hotKeyWords,
            banners: banners
        }
        let str = ReactDomServer.renderToString(<Home appData={appData} />)
        let ret = index.replace('<div id="root"></div>',
            `
            <script>
            window.appData=${JSON.stringify(appData)}
            </script>
            <div id="root">${str}</div>`)
        ctx.body = ret
    })
} else {
    router.get('/', async ctx => {
        ctx.body = "render disabled because env is development"
    })
}

export default router.routes()
