import { SubscribeData } from '@/models/site'
import db from '~/libs/database'
import * as redis from '~/libs/redis'


interface CategoryRow {
    ID: number;
    parent_id: number;
    title: string;
}

interface UserSubscribeRow {
    ID: number;
    user_id: number;
    category_id: string;
}

// 用户已选 (横条)
export async function getSubscibe(userID: number):Promise<SubscribeData[]> {
    let rows = await db.query('SELECT * FROM user_subscribe_table WHERE user_id=?', [userID]) as UserSubscribeRow[]
    let data = rows[0];
    if (!data) {
        return [
            { ID: 0, title: '精选推荐' },
            { ID: 2, title: '前沿技术' },
            { ID: 3, title: '互联网产品' },
            { ID: 5, title: '环境艺术设计' },
        ];
    } else {
        return JSON.parse(data.category_id)
    }
}


// 所有数据 (对话框)
export async function getAllSubscibe(userID: number): Promise<SubscribeData[]> {
    let result: SubscribeData[] = await redis.readCache(redis.KEY_APP_ALL_SUBSCRIBE_CACHE)
    if (!result) {
        result = [];
        // 所有选项
        let rows = await db.query('SELECT * FROM category_table ORDER BY parent_id') as CategoryRow[]
        rows.forEach(row => {
            if (row.parent_id == 0) {
                result.push({
                    ID: row.ID,
                    title: row.title,
                    children: [],
                })
            } else {
                result.find(item => item.ID == row.parent_id)?.children?.push({
                    ID: row.ID,
                    title: row.title,
                })
            }
        })
    }
    await redis.writeCache(redis.KEY_APP_ALL_SUBSCRIBE_CACHE, result)

    // 用户选了什么
    return result
}
