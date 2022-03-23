import redis from 'redis'
import redisConf from '~/config/redis'
import { promisify } from 'util'
import { enableCache } from '~/config/app';

//KEYS
export const KEY_APP_CATEGORY_CACHE = 'KEY_APP_CATEGORY_CACHE'
export const KEY_APP_ALL_SUBSCRIBE_CACHE = 'KEY_APP_ALL_SUBSCRIBE_CACHE'
export const KEY_APP_TOPICS = 'KEY_APP_TOPICS'
export const KEY_APP_SITELINK = 'KEY_APP_SITELINK'
export const KEY_APP_SEARCH_PRE = 'KEY_APP_SEARCH_PRE_'
export const KEY_COURSE_DETAIL_PRE = 'KEY_COURSE_DETAIL_PRE'





let client = redis.createClient(redisConf)

export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);



export async function readCache(key: string): Promise<any> {
    if (enableCache) {
        let str = await get(key)
        if (str) {
            try {
                return JSON.parse(str)
            } catch (e) { }
        }
    }
    return undefined
}

export async function writeCache(key: string, data: any): Promise<any> {
    if (enableCache) {
        let setRedisCache = await set(key, JSON.stringify(data))
        if (!setRedisCache) {
            console.error("SetRedisCache Failed!")
        }
    }
    return undefined
}


// 回调取值 服务器为异步 所以需要更改
// client.get('name', (err, data) => {
//     console.log(err, data)
// })

// 回调函数转成await方式
// const get = promisify(client.get).bind(client);
// (async () => {
//     let ret = await get('name')
//     console.log(ret)
// })();

