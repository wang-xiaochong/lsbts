


import { CourseChapterData } from '@/models/course';
import db from '~/libs/database'

export async function getChapters(courseID: number): Promise<CourseChapterData[]> {


    const chapterRows = await db.query<any>(`SELECT * FROM course_chapter_table WHERE course_id=?`, [courseID])
    const sectionRows = await db.query<any>(`SELECT * FROM course_section_table WHERE course_id=?`, [courseID])

    // chapter
    const chapters: CourseChapterData[] = [];

    chapterRows.forEach(chapter => {
        chapters.push({
            ID: chapter.ID,
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
    sectionRows.forEach(({ ID, title, type, item_id, chapter_id }) => {
        let chapter = chapters.find(chapter => chapter.ID === chapter_id);
        if (chapter) {
            chapter.sections.push({
                ID, title, type,
                item: tables[type].find(row => row.ID === item_id)
            });
        }
    })

    return chapters

}