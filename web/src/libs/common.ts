import { Dispatch } from "redux"

const value: {
    dispatch?: Dispatch
} = {}
export default value


export function ts2string(ts: number, format: string): string {
    let date = new Date(ts);
    return format
        .replace(/yyyy/g, date.getFullYear().toString())
        .replace(/MM/g, (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace(/M/g, (date.getMonth() + 1).toString())
        .replace(/dd/g, date.getDate().toString().padStart(2, '0'))
        .replace(/d/g, date.getDate().toString())
        .replace(/HH/g, date.getHours().toString().padStart(2, '0'))
        .replace(/H/g, date.getHours().toString())
        .replace(/mm/g, date.getMinutes().toString().padStart(2, '0'))
        .replace(/m/g, date.getMinutes().toString())
        .replace(/ss/g, date.getSeconds().toString().padStart(2, '0'))
        .replace(/s/g, date.getSeconds().toString())
}

export function duration2string(duration: number): string {
    if (duration < 60) return duration + '秒';
    else if (duration < 3600) return Math.floor(duration / 60) + '分钟';
    else return Math.floor(duration / 3600) + '小时' + (Math.floor(duration / 60)) % 60 + '分钟';
}
