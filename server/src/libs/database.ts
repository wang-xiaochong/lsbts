
// mysql2中有promise版本,但引入promise版本后所有的mysql操作都是异步
import Mysql from 'mysql2/promise';


// createConnection     单连接
// createPool           连接池
// createPoolCluster    集群

import { db } from '~/config/database'

class DataBase {
    private db;
    constructor(db: Mysql.Pool | Mysql.Connection) {
        this.db = db

    }
    async query(sql: string, args?: any[]) {
        let res = await this.db.query(sql,args)
        return res[0] as any[]
    }
    async execute(sql: string, args: any[]) {
        let res = await this.db.execute(sql,args)
        return res[0] as any[]
    }

}

const pool = Mysql.createPool(db);
export default new DataBase(pool)


// const pool = Mysql.createPool(db);
// export default pool;







// 普通版本mysql2 返回信息是回调方式 koa是异步的，async await ，所以需要更换版本
// conn.query('SELECT * FROM banner_table', (err, rows) => {
//     if(!err) console.log(rows)
// })

