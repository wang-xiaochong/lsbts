import { SearchResult } from 'models/search'
import db from '~/libs/database'
import { maxHotKeyWords } from '~/config/app'
import { CourseListSearchPageSize, CourseSummaryData, SearchCategoryData, SearchParams } from '@/models/course';
import { assert } from '~/libs/common';

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
    const { category, category_level, keyword, page } = params
    let cords: string[] = [];

    // category 和 category_leval
    if (category && category_level && category.toString() != '0' && category_level.toString() != '0')
        cords.push(`category_id_${category_level}=${category}`);

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




interface CategoryTagsRow {
    ID: number;
    category_id: number;
    category_level: number;
    title: string;
    options: string;
    allow_multi: number;
    sort: number;
}

export async function getSearchCategoryOptions(
    category: number, category_level: number
): Promise<SearchCategoryData[]> {
    assert(typeof category != 'number', 400, 'request arguments invaild 1');
    assert(typeof category_level != 'number', 400, 'request arguments invaild 2');
    assert(category_level != 1 && category_level != 2 && category_level != 3, 400, 'request arguments invaild 3');
    let rows = await db.query<CategoryTagsRow>(`
      SELECT * FROM
        category_tags_table
      WHERE
        category_id=? AND category_level=?
      ORDER BY
        sort ASC
    `, [
        category, category_level
    ]);

    return rows.map(item => {
        return {
            key: item.ID,
            title: item.title,
            options: item.options.split(','),
            allow_multi: item.allow_multi == 1,
        };
    });
}

