import Router from '@koa/router'
export function init(router: Router) {
    // api
    router.prefix('/api')
    router.get('/getusers', async ctx => {
        let users = [{ name: '123' }, { name: '456' }]
        ctx.body = users
    })


}


// export default router.routes()
