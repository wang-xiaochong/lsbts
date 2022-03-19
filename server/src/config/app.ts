import path from 'path'
export const staticRoot = path.resolve(__dirname, '../build')
export const enableCors = true
export const enableCache = (process.env.NODE_ENV === 'production' ? true : false)
export const maxHotKeyWords = 5
export const maxSuggestKeyWords = 10
export const MAX_COURSE_LIST_COUNT = 10;