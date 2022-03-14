import { CategoryData } from '@/models/category';
import db from '../libs/database';
import * as redis from '../libs/redis';

export async function getCategory(): Promise<CategoryData[]> {
    // 1- 找redis要
    let data = await redis.readCache(redis.KEY_APP_CATEGORY_CACHE)
    if(data) return data
    // 2- 万一没有
    let result: CategoryData[] = [];
    let categories = await db.query('SELECT * FROM category_table');
    let items = await db.query('SELECT * FROM category_item_table ORDER BY sort ASC');
    // 组装数据
    categories.forEach(data => {
        const { parent_id } = data;
        delete data.parent_id
        delete data.sort
        if (parent_id === 0) {
            result.push(data)
        } else {
            // 找到parent_id对应的数据
            let parent = categories.find(data => data.ID === parent_id)
            // 添加到children
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(data);
            }
        }
    });
    // 添加二级items
    items.forEach(data => {
        const { category_id } = data;
        delete data.category_id
        delete data.sort
        let parent = categories.find(data => data.ID === category_id)
        if (parent) {
            parent.items = parent.items || [];
            parent.items.push(data);
        }
    })
    // 写入缓存
    await redis.writeCache(redis.KEY_APP_CATEGORY_CACHE,result)
    // console.log(JSON.stringify(result))
    return result
}
