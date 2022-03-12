import { SearchResult } from 'models/search'
import db from '~/libs/database'
import { maxHotKeyWords, maxSuggestKeyWords } from '~/config/app'
import { RowDataPacket } from 'mysql2'

// 全站最热门
// export async function getHot(): Promise<SearchResult> {
//     let data = (await db.query(`SELECT keyword FROM search_record_table ORDER BY count DESC LIMIT ${maxHotKeyWords}`))[0] as RowDataPacket[];
//     return data.map(row => row.keyword)
// }

// 关键字相关
export async function getSuggest(kw: string): Promise<SearchResult> {
    let data = await db.query(`
    SELECT 
    keyword 
    FROM search_record_table 
    WHERE keyword LIKE ?
    ORDER BY count DESC
    LIMIT ${maxHotKeyWords}`,
        [
            kw + '%'
        ]
    );
    return data.map(row => row.keyword)
}