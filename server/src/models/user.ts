
import db from '~/libs/database'
import { UserCourseProgressData, UserCourseTabData, UserData } from 'models/user'

// 用户相关
type Result = boolean
type Token = {
    token: string
}

export type userData = {
    nickname?: string,
    token?: string,
    avatar?: string,
}


export async function getUserCheck(kw: string): Promise<Token> {
    let rows = await db.query<{ token: string }>(`
    SELECT 
    token 
    FROM user_table 
    WHERE nickname=?
    `,
        [
            kw,
        ]
    );
    if (rows.length > 0) {
        let ret = { token: '' }
        ret.token = rows[0].token
        return ret
    }
    return { token: '' }
}

export async function getUserAdd(payload: userData): Promise<Result> {
    let ret = await db.execute(`
    INSERT INTO user_table
    (nickname,avatar,token,qq_unionid,points,currentcy,mobile,address,blocked)
    VALUES 
    (?,?,?,'',0,0,'','',0)
    `,
        [
            payload.nickname, payload.avatar, payload.token
        ]
    );
    if (ret) {
        return true
    }
    return false
}

export async function getUserInfo(token: string): Promise<UserData | undefined> {
    let rows = await db.query<{
        ID: number, avatar: string, nickname: string, points: number, currency: number,
    }>(`
    SELECT 
    ID,avatar,nickname,points,currency
    FROM user_table 
    WHERE token=?
    `,
        [
            token
        ]
    );
    return rows[0]
}

export async function getUserID(token: string | undefined): Promise<number> {
    if (!token) return 0;
    else {
        let { ID } = await db.one<{ ID: number }>(
            'SELECT ID FROM user_table WHERE token=?', [token]
        );
        if (ID) return ID
        else return 0
    }
}

// progressInfo
export async function getUserCourseProgressData(userID: number): Promise<UserCourseProgressData> {

    let date = new Date()
    let today = Number(date.getFullYear() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0'))

    // points
    const { points } = await db.one<{ points: number }>(`SELECT points FROM user_table WHERE ID=?`, [userID])
    // 
    const data = await db.one<{ studyTime: number, points: number }>(`SELECT studyTime,points FROM user_points_table WHERE user_id=? AND date=?`, [userID, today])
    let todayCourseSec = 0;
    let todayPoints = 0;
    if (data) {
        todayCourseSec = data.studyTime
        todayPoints = data.points
    }
    //比他今日学分高的人数
    const { count } = await db.one<{ count: number }>(`SELECT COUNT(*) AS count  FROM user_points_table WHERE studyTime>? AND date=?`, [todayCourseSec, today])
    const { count: totalStudents } = await db.count('user_table')
    const todayCourseRank = Math.round((totalStudents - count) / totalStudents * 1000) / 1000;
    const ret = {
        points,
        todayCourseRank,
        todayPoints,
        todayCourseSec,
    }
    return ret
}

// courseTabData
export async function getUserPaiedCourse(userID: number): Promise<UserCourseTabData[]> {
    return await db.query<any>(`
    SELECT
        course.ID,course.title,course.expires,
        0 AS progress
    FROM
        pay_table AS pay LEFT JOIN
        course_table AS course ON pay.course_id=course.ID
    WHERE
        pay.status='success' AND pay.user_id=?
    `, [userID])



}