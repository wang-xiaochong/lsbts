
import db from '~/libs/database'
import { readCache, writeCache, KEY_COURSE_DETAIL_PRE } from '~/libs/redis'
import { CourseDetail, CourseSummaryData, SearchParams, TeacherData, VideoSectionData } from '@/models/course'
import { MAX_COURSE_LIST_COUNT } from '~/config/app'
import { getChapters } from './course/chapter'
import { assert, md5 } from '~/libs/common'

import path from 'path'
import urlLib from 'url'
import { key } from '~/config/video'

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


// course detail
export async function getCourseDetail(courseID: number): Promise<CourseDetail> {
     const key = KEY_COURSE_DETAIL_PRE + courseID;
     let result: CourseDetail = await readCache(key)
     if (result) return result;


     // 课程数据————course_table
     const courseRow = await db.one<any>(`SELECT * FROM course_table WHERE ID=?`, [courseID]);

     const course = {
          ID: courseRow.ID,
          cover: courseRow.cover,
          title: courseRow.title,
          price: courseRow.price,
          total_students: 0,
          recently_students: 0,
          rank: courseRow.rank,
          // isRegisted: false,
          summary: courseRow.summary,
          description: courseRow.description,

     }

     // 讲师信息
     const teacherRows = await db.query<any>(`SELECT * FROM teacher_table WHERE ID IN (${courseRow.teachers})`)
     // console.log(teachers)
     const teachers: TeacherData[] = teacherRows.map(({ ID, name, title, summary, avatar }) => {
          return { ID, name, title, summary, avatar }
     })



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
     const { count: total_course } = await db.one<any>(`SELECT COUNT(*) AS count FROM course_table WHERE agency_id=?`, [agencyRow.ID])
     const { count: total_students } = await db.one<any>(`SELECT COUNT(*) AS count FROM pay_table WHERE agency_id=?`, [agencyRow.ID])
     const agency = {
          avatar: agencyRow.logo,
          agency_name: agencyRow.name,
          agency_rank: agencyRow.rank,
          summary: agencyRow.summary,
          total_course: total_course,
          total_students: total_students,

     }

     // 章节————course_chapter course_section course_live course_video
     const chapters = await getChapters(courseID)
     // console.log(JSON.stringify(chapters))

     // 评论————course_comment_table
     const commentRows = await db.query<any>(`SELECT * FROM course_comment_table WHERE course_id=?`, [courseID])
     // const comments = commentRows.map(comment => (
     //      { ID: comment.ID, rank: comment.rank, time: comment.time, course_time: comment.course_time, content: comment.content, avatar: comment.avatar, nickname: comment.nickname }
     // ))
     const comments = commentRows.map(({
          ID, rank, time, course_time, content, avatar, nickname
     }) => {
          return { ID, rank, time, course_time, content, avatar, nickname }
     })

     // ({
     //      ID, rank, time, course_time, content, avatar, nickname
     // })

     // cache
     result = { course, teachers, category, agency, chapters, comments }
     await writeCache(key, result)
     // console.log(JSON.stringify(ret))
     return result

}

// 课程报名
export async function isUserRegisted(courseID: number, userID: number): Promise<boolean> {

     let { count } = await db.one<{ count: number }>(`
     SELECT COUNT(*) AS count FROM pay_table WHERE course_id=? AND user_id=?
     `, [courseID, userID])

     return count > 0;
}


// video section

// video link
export async function createVideoLink(sectionID: number, userID: number): Promise<VideoSectionData> {

     // 1. 校验权限
     const sectionRow = await db.one<any>(`SELECT * FROM course_section_table WHERE ID=?`, [sectionID])
     assert(! await isUserRegisted(sectionRow.course_id, userID), 403, '需要报名课程后查看')

     // 2. 获取视频信息
     const videoRow = await db.one<any>(`SELECT * FROM course_video_table WHERE ID=?`, [sectionRow.item_id])
     assert(!videoRow, 404, '视频不存在或已被删除')
     // 3. 拼装link
     const { videoID, duration } = videoRow

     const t = (Math.floor((Date.now() / 1000) + duration * 2)).toString(16);
     const dir = path.parse(urlLib.parse(videoID).path || '').dir + '/'
     const sign = md5(key + dir + t);
     return {
          section_title: sectionRow.title,
          videoLink: `${videoID}?t=${t}&sign=${sign}`
     }
}