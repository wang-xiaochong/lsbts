import { CategoryData } from '@/models/category';
import db from '../libs/database';
import * as redis from '../libs/redis';

interface CategoryRow {
    ID: number;
    parent_id: number;
    title: string
}
interface CategoryItemRow {
    ID: number;
    category_id: number;
    title: string;
    sort: number;
}


export async function getCategory(): Promise<CategoryData[]> {
    // 1- 找redis要
    let data = await redis.readCache(redis.KEY_APP_CATEGORY_CACHE)
    if (data) return data
    // 2- 万一没有
    let result: CategoryData[] = [];

    let categories = await db.all<CategoryRow>('category_table', 'parent_id', 'asc');
    let items = await db.all<CategoryItemRow>('category_item_table', 'category_id', 'asc');
    // 组装数据
    categories.forEach(data => {
        let categoryData: CategoryData = {
            ID: data.ID,
            title: data.title,
        }
        const { parent_id } = data;
        if (parent_id === 0) {
            result.push(categoryData)
        } else {
            // 找到parent_id对应的数据
            let parent = result.find(data => data.ID === parent_id)
            // 添加到children
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(categoryData);
            }
        }
    });

    // 添加二级items
    items.forEach(data => {
        let categoryItem: CategoryData = {
            ID: data.ID,
            title: data.title,
        }
        const { category_id } = data;
        // 二级下面三级的添加
        {
            // console.log(result)
            result.forEach(data => {
                let parent = data.children?.find(item => item.ID === category_id)
                if (parent) {
                    if (!parent.items) parent.items = [];
                    parent.items.push(categoryItem)
                }
            })
        }
        // 一级下面三级添加
        {
            let parent = categories.find(data => data.ID === category_id)
            if (parent) {
                let leval1 = categories.find(data => data.ID === parent?.parent_id)
                let ret = result.find(data => data.ID === leval1?.ID)
                if (ret) ret.items = ret.items || []
                if (ret?.items && ret?.items?.length < 3) {
                    ret.items.push(categoryItem);
                }
            }
        }
    })
    // 写入缓存
    await redis.writeCache(redis.KEY_APP_CATEGORY_CACHE, result)
    // console.log(JSON.stringify(result))
    return result
}
