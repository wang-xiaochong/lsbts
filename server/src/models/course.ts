
import db from '~/libs/database'
import { CourseSummaryData, SearchParams } from '@/models/course'
const MAX_COURSE_LIST_COUNT = 10;
export async function getCourseSummaryByCategory(category_id: number, category_leval: 1 | 2 | 3): Promise<CourseSummaryData[]> {
     let rows = await db.query<CourseSummaryData>(`
   SELECT 
        course.ID, course.title,course.cover,course.price,course.agency_id,
        agency.name AS agency_name,
        0 AS recent_order_count,
        0 AS section_count
   FROM 
        course_table AS course LEFT JOIN
        agency_table AS agency ON course.agency_id=agency.ID
    WHERE
        category_id_${category_leval}=?

   LIMIT
        ${MAX_COURSE_LIST_COUNT}
   `, [category_id])
     return rows
}

export async function search(params: SearchParams): Promise<CourseSummaryData[]> {
     const { category, category_leval, ketword } = params
     let cords: string[] = [];

     // category 和 category_leval
     if (category) cords.push(`category_id_${category_leval}=${category}`);

     // keyword
     if (ketword) {
          let kws = ketword.split(/\s+/);
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
          LIMIT
          ${MAX_COURSE_LIST_COUNT}
          `
     // console.log(sqlsting)
     let rows = await db.query<CourseSummaryData>(sqlsting)
     // console.log(rows)
     return rows

}

