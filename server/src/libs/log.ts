

import fs from 'fs'
import { errorLogPath } from '~/config/app'


export function error(e: any) {
    let date = new Date();
    let dates = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    fs.appendFile(
        errorLogPath,
        `[${dates}] ${e.stack}\n`,
        () => { }
    )
}
