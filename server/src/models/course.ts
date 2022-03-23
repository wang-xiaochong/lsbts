
import db from '~/libs/database'
import { readCache, writeCache, KEY_COURSE_DETAIL_PRE } from '~/libs/redis'
import { CourseChapterData, CourseDetail, CourseSummaryData, SearchParams } from '@/models/course'
import { MAX_COURSE_LIST_COUNT } from '~/config/app'
import { getChapters } from './course/chapter'

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
     const courseRow = await db.one<any>(`SELECT * FROM course_table WHERE ID=?`, [courseID]);

     // 讲师信息
     const teacherRows = await db.query(`SELECT * FROM teacher_table WHERE ID IN (${courseRow.teachers})`)
     // console.log(teachers)

     // 类目数据————category_table  category_item_table
     const cate1 = await db.one<any>(`SELECT * FROM category_table WHERE ID=?`, [courseRow.category_id_1])
     const cate2 = await db.one<any>(`SELECT * FROM category_table WHERE ID=?`, [courseRow.category_id_2])
     const cate3 = await db.one<any>(`SELECT * FROM category_item_table WHERE ID=?`, [courseRow.category_id_3])

     const category = [
          { ID: courseRow.category_id_1, title: cate1.title },
          { ID: courseRow.category_id_2, title: cate2.title },
          { ID: courseRow.category_id_3, title: cate3.title },
     ];
     // console.log(category)

     // 机构信息————agency_table
     const agencyRow = await db.one<any>(`SELECT * FROM agency_table WHERE ID=?`, [courseRow.agency_id])
     // console.log(agency)

     // 章节————course_chapter course_section course_live course_video
     const chapters = await getChapters(courseID)
     console.log(JSON.stringify(chapters))
     // 评论————course_comment_table


     return;
}
