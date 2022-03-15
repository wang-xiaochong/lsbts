export function assert(expr: any, code: number, msg: string) {
    if (expr) throw { code, msg }
}