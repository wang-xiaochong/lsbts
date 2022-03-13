import { SubscribeData } from '@/models/site'
import db from '~/libs/database'
import { get, set, KEY_APP_ALL_SUBSCRIBE_CACHE } from '~/libs/redis'
import { enableCache } from '~/config/app'

interface CategoryRow {
    ID: number;
    parent_id: number;
    title: string;
}

// 用户已选 (横条)
export function getSubscibe() {

}

// 所有数据 (对话框)
export async function getAllSubscibe(userID:number): Promise<SubscribeData[]> {
    // 所有选项
    let rows = await db.query('SELECT * FROM category_table ORDER BY parent_id') as CategoryRow[]
    let result: SubscribeData[] = []
    rows.forEach(row => {
        if (row.parent_id == 0) {
            result.push({
                ID: row.ID,
                title: row.title,
                children: [],
            })
        } else {
            result.find(item => item.ID == row.parent_id)?.children.push({
                ID: row.ID,
                title: row.title,
                checked: false,
            })
        }
    })
    // 用户选了什么
    return result
}
