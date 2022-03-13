
import db from '~/libs/database'
import { RowDataPacket } from 'mysql2'
import { UserData } from 'models/user'

// 用户相关
type Result = boolean
type Token = {
    token: string
}
export async function getUserCheck(kw: string): Promise<Token> {
    let rows = await db.query(`
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

export type userData = {
    nickname?: string,
    token?: string,
    avatar?: string,
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
    let rows = await db.query(`
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