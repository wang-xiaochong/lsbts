import crypto from 'crypto';

export function assert(expr: any, code: number, msg: string) {
    if (expr) throw { code, msg }
}

export function md5(data: string | NodeJS.ArrayBufferView): string {
    return crypto.createHash('md5').update(data).digest('hex')
}

