import { SearchResult } from 'models/search'
import db from '~/libs/database'
import { maxHotKeyWords } from '~/config/app'
import { CourseListSearchPageSize, CourseSummaryData, SearchCategoryData, SearchParams } from '@/models/course';
import { assert } from '~/libs/common';
import { KEY_APP_SEARCH_PRE, readCache, writeCache } from '~/libs/redis';

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

    // cache
    const key = KEY_APP_SEARCH_PRE + JSON.stringify(params);
    let result = await readCache(key)
    if (result) return result;

    // database
    const { category, category_level, keyword, page, categories } = params
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
         course.ID, course.title,course.cover,course.price,course.agency_id,tags,
         agency.name AS agency_name,
         0 AS recent_order_count,
         0 AS section_count
    FROM 
         course_table AS course LEFT JOIN
         agency_table AS agency ON course.agency_id=agency.ID
         ${where} 
         ${order}
         `

    // console.log(sqlsting)

    // let data = await db.query<CourseSummaryData & { tags: string }>(sqlsting, [(page - 1) * CourseListSearchPageSize, CourseListSearchPageSize])
    let data = await db.query<CourseSummaryData & { tags: string }>(sqlsting)


    // categories
    data = data.filter(item => {
        let json = JSON.parse(item.tags) as { [key: string]: string };
        let tags: { [key: string]: string[] } = {}
        for (let key in json) {
            tags[key] = json[key].split(',');
        }
        return tagsMatchSearch(categories, tags)
    })

    let total = data.length;
    let start = (page - 1) * CourseListSearchPageSize;
    let count = CourseListSearchPageSize;



    // let sqlstingCount = `SELECT COUNT(*) AS count FROM course_table ${where} ${order}`;
    // let [{ count }] = await db.query<{ count: number }>(sqlstingCount)

    // console.log(rows)
    let result2 = {
        data: data.slice(start, count),
        total,
    }
    // cache
    await writeCache(key, result2);
    return result2
}


interface CourseTags {
    [key: string]: string[];
}
function tagsMatchSearch(search: CourseTags, course: CourseTags): boolean {
    for (let key in search) {
        if (!course[key]) return false;
        for (let i = 0; i < search[key].length; i++) {
            let s = search[key][i]
            if (course[key].indexOf(s) === -1) return false
        }
    }
    return true
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

