import Router from '@koa/router'
import * as API from '~/routers/api/api'
import *as Render from '~/routers/render/render'

const router = new Router();

API.init(router);
Render.init(router);


export default router.routes();