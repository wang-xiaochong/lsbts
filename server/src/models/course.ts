
import db from '~/libs/database'
import { readCache, writeCache, KEY_COURSE_DETAIL_PRE } from '~/libs/redis'
import { CourseDetail, CourseSummaryData, SearchParams } from '@/models/course'
import { MAX_COURSE_LIST_COUNT } from '~/config/app'

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



export async function getCourseDetail(courseID: number): Promise<CourseDetail | undefined> {
     // 课程数据————course_table

     let course = await db.one(`SELECT * FROM course_table`);
     console.log(course)




     // 讲师信息
     // 类目数据————category_table  category_item_table
     // 机构信息————agency_table
     // 章节————course_chapter course_section course_live course_video
     // 评论————course_comment_table


     return;
}
