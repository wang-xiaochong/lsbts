export function home() {
    return '/'
}

export function list(category: number, leval: 1 | 2 | 3) {
    return `/list?category=${category}&leval=${leval}`
}