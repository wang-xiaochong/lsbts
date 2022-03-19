import { SearchResult } from 'models/search'
import db from '~/libs/database'
import { maxHotKeyWords } from '~/config/app'
import { CourseListSearchPageSize, CourseSummaryData, SearchParams } from '@/models/course';

// 全站最热门
// export async function getHot(): Promise<SearchResult> {
//     let data = (await db.query(`SELECT keyword FROM search_record_table ORDER BY count DESC LIMIT ${maxHotKeyWords}`))[0] as RowDataPacket[];
//     return data.map(row => row.keyword)
// }

// 关键字相关
export async function getSuggest(kw: string): Promise<SearchResult> {
    let data = await db.query<{ keyword: string }>(`
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


// 搜索课程
export async function searchCourse(params: SearchParams): Promise<{ data: CourseSummaryData[], total: number }> {
    const { category, category_leval, keyword, page } = params
    let cords: string[] = [];

    // category 和 category_leval
    if (category) cords.push(`category_id_${category_leval}=${category}`);

    // keyword
    if (keyword) {
        let kws = keyword.split(/\s+/);
        // console.log(kws);
        let arr: string[] = [];
        kws.forEach(kw => {
            arr.push(`title LIKE '%${kw}%'`);
        })
        cords.push(
            '(' + arr.join(' OR ') + ')'
        );
    }
    // console.log(cords.join(' AND '))

    // type
    const { filter } = params
    const { type, sort } = filter;
    if (type === 'free') {
        cords.push('price=0')
    } else if (type) {
        cords.push('price>0')
    }
    let cord = cords.join(' AND ')
    // console.log(cord)
    let where: string = '';
    if (cord) where = ` WHERE ${cord}`

    //filter.sort
    let order: string = '';
    if (sort !== 'default' && sort !== 'students') {
        order = ` ORDER BY ${sort} DESC`
    }

    // let sqlsting = `SELECT * FROM course_table ${where} ${order}`
    let sqlsting = `
    SELECT 
         course.ID, course.title,course.cover,course.price,course.agency_id,
         agency.name AS agency_name,
         0 AS recent_order_count,
         0 AS section_count
    FROM 
         course_table AS course LEFT JOIN
         agency_table AS agency ON course.agency_id=agency.ID
         ${where} 
         ${order}
         LIMIT ?,?
         `
    // console.log(sqlsting)
    let data = await db.query<CourseSummaryData>(sqlsting, [(page - 1) * CourseListSearchPageSize, CourseListSearchPageSize])

    let sqlstingCount = `SELECT COUNT(*) AS count FROM course_table ${where} ${order}`;
    let [{ count }] = await db.query<{ count: number }>(sqlstingCount)

    // console.log(rows)
    return {
        data: data,
        total: count,
    }

}

