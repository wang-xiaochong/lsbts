
import db from '~/libs/database'
import { UserCourseProgressData, UserCourseTabData, UserData, UserOrderData } from 'models/user'

// 用户相关
type Result = boolean
type User = {
    user_id: number;
}

export type userData = {
    nickname?: string,
    token?: string,
    avatar?: string,
}


export async function getUserCheck(openID: string): Promise<User> {
    let rows = await db.query<{ user_id: number }>(`
    SELECT 
    user_id
    FROM qq_user_table 
    WHERE open_id=?
    `,
        [
            openID,
        ]
    );
    if (rows.length > 0) {
        return {user_id:rows[0].user_id}
    }
    return {user_id:-1}
}

export async function getUserUpdate(payload: userData,user_id:number): Promise<Result> {
    let ret = await db.execute(`
    UPDATE user_table
    SET nickname=?,avatar=?,token=?
    WHERE ID=?
    `,
        [
            payload.nickname, payload.avatar, payload.token,user_id
        ]
    );
    if (ret) {
        return true
    }
    return false
}

export async function getUserAdd(payload: userData, openID: string): Promise<Result> {
    //console.log(payload,openID);
    let userAddResult = await db.execute(`
    INSERT INTO user_table
    (nickname,avatar,token,qq_unionid,points,currency,mobile,address,blocked)
    VALUES 
    (?,?,?,'',0,0,'','',0)
    `,
        [
            payload.nickname, payload.avatar, payload.token
        ]
    );
    
    let { ID: user_id } = (await db.query<{ ID: number }>(`SELECT ID FROM user_table WHERE token=?`, [payload.token]))[0];
    let ret = await db.execute(`
    INSERT INTO qq_user_table
    (user_id,open_id)
    VALUES 
    (?,?)
    `,
        [
            user_id, openID
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
        let row = await db.one<{ ID: number }>(
            'SELECT ID FROM user_table WHERE token=?', [token]
        );
        let ID =row.ID;
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

export async function getUserOrders(userID: number): Promise<UserOrderData[]> {
    let rows = await db.query<any>(
        `
        SELECT
          pay.ID,
          pay.time,
          agency.name AS agency_name,
  
          course.ID AS course_id,
          course.cover,
          course.title,
          '' AS className,
          course.price,
          pay.status
        FROM
          pay_table AS pay LEFT JOIN
          agency_table AS agency ON pay.agency_id=agency.ID LEFT JOIN
          course_table AS course ON pay.course_id=course.ID
        WHERE
          pay.user_id=?
  
        ORDER BY pay.time DESC
      `,
        [userID]
    );

    let ret = rows.map(row => {
        return {
            ID: row.ID,
            time: row.time,
            agency_name: row.agency_name,
            courses: [
                {
                    ID: row.course_id,
                    cover: row.cover,
                    title: row.title,
                    className: row.className,
                    price: row.price,
                    status: row.status,
                }
            ]
        };
    });
    return ret
}