
import db from '~/libs/database'
import { CourseSummaryData } from '@/models/course'
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