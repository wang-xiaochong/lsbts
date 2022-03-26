


import { CourseChapterData } from '@/models/course';
import db from '~/libs/database'

export async function getChapters(courseID: number, userID?: number): Promise<CourseChapterData[]> {

    if (!userID) userID = 0;
    const chapterRows = await db.query<any>(`SELECT * FROM course_chapter_table WHERE course_id=?`, [courseID])
    const sectionRows = await db.query<any>(`
    SELECT
        section.*,progress.time
    FROM
        course_section_table AS section LEFT JOIN
        course_progress_table AS progress ON progress.course_section_id=section.ID
    WHERE
    section.course_id=?`, [courseID])
    const progressRows = await db.query<any>(`SELECT * FROM course_progress_table WHERE course_id=? AND user_id=?`, [courseID, userID])
    // chapter
    const chapters: CourseChapterData[] = [];

    chapterRows.forEach(chapter => {
        chapters.push({
            ID: chapter.ID,
            progress: 0,
            title: chapter.title,
            sections: [],
        })
    })

    let types: {
        [key: string]: number[]
    } = {};
    sectionRows.forEach(({ item_id, type }) => {
        if (!types[type]) types[type] = [];
        types[type].push(item_id);
    });

    let fields: {
        [key: string]: string,
    } = {
        'video': 'ID,videoID,duration',
        'live': 'ID,liveID,start_time,end_time',
        'read': 'ID',
        'download': 'ID,fileID,size'
    };

    let tables: {
        [key: string]: any[]
    } = {};
    for (let type in types) {
        tables[type] = await db.query<any>(
            `SELECT ${fields[type]} FROM course_${type}_table WHERE ID IN (${types[type].join(',')})`
        )
    }
    // console.log(tables)

    // section
    sectionRows.forEach(({ ID, title, type, item_id, chapter_id,time }) => {
        let chapter = chapters.find(chapter => chapter.ID === chapter_id);
        let itemRow = tables[type].find(row => row.ID === item_id)
        if (chapter) {
            let progress = 0;
            if (type === 'video') {
                let progressRow = progressRows.find(item => item.course_section_id === ID)
                if (progressRow && itemRow) {
                    progress = Math.min(1, Math.round(100 * progressRow.progress / itemRow.duration) / 100);
                }
            } else progress = 1;
            chapter.sections.push({
                ID, title, type,
                progress,
                item: itemRow,
                time,
            });
        }
    })

    chapters.forEach(chapter => {
        let sum = 0;
        chapter.sections.forEach(section => {
            sum += section.progress
        })
        chapter.progress = Math.min(1, Math.round(100 * sum / chapter.sections.length) / 100)
    })





    return chapters

}