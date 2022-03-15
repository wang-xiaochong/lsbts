import { SubscribeData } from '@/models/site'
import { assert } from '~/libs/common';
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
export async function getSubscibe(userID: number): Promise<SubscribeData[]> {
    let rows = await db.query('SELECT category_id FROM user_subscribe_table WHERE user_id=?', [userID]) as UserSubscribeRow[]
    let data = rows[0];
    let result: SubscribeData[] = [{ ID: 0, title: '精选推荐' }]
    if (!data) {
        result.push({ ID: 2, title: '前沿技术' }, { ID: 3, title: '互联网产品' }, { ID: 5, title: '环境艺术设计' })
    } else {
        let category_id = JSON.parse(data.category_id)
        for (let i = 0; i < category_id.length; i++) {
            let rows = await db.query('SELECT ID,title FROM category_table WHERE ID=?', category_id[i])
            result.push(rows[0])
        }
    }
    return result
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

// 设置-用户已选
export async function setMySubscribe(userID: number, data: SubscribeData[]): Promise<void> {
    // 用户没登陆
    {
        assert(!userID, 401, '请先登录再设置')
    }
    // 用户不存在
    {
        let rows = await db.query('SELECT * FROM user_table WHERE ID=?', [userID]);
        assert(rows.length === 0, 400, '数据异常请重新登录')
    }
    // 数据有问题
    { assert(!(data instanceof Array), 400, '数据异常刷新重试') }
    // 正确
    {
        let category_id: number[] = []
        for (let i = 1; i < data.length; i++) {
            category_id.push(data[i].ID)
        }
        let rows = await db.query('SELECT * FROM user_subscribe_table WHERE user_id=?', [userID])
        let ret: any;
        if (rows[0].length !== 0) {
            ret = await db.execute(`
    UPDATE  user_subscribe_table
    SET category_id=?
    WHERE user_id=?
    `, [category_id, userID]);
        } else {
            ret = await db.execute(`
    INSERT INTO user_subscribe_table
    (user_id,category_id)
    VALUES 
    (?,?)
    `, [userID, category_id])
        }
    }

}