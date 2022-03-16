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
import { Provider } from 'react-redux'
import store from './store'
import { getTopics } from '~/models/topic'
import { getSiteLink } from '~/models/link'


let router = new Router()
let enableRender = process.env.NODE_ENV === 'production'
// enableRender = true
if (enableRender) {
    // 服务端进行渲染
    router.get('/', async ctx => {
        let index = fs.readFileSync(path.resolve(staticRoot, 'index.html')).toString()
        let categories = await getCategory()
        let hotKeyWords = await getSuggest('')
        let banners = await getAllBanners()
        let topics = await getTopics()
        let links = await getSiteLink()

        let appData: AppData = {
            categories: categories,
            hotKeyWords: hotKeyWords,
            banners: banners,
            topics,
            links,
        }
        let str = ReactDomServer.renderToString(
            <Provider store={store}>
                <Home appData={appData} />
            </Provider>
        );
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
