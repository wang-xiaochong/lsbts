export function home() {
    return '/'
}

export function list(category?: number, leval?: 1 | 2 | 3) {
    if (category && leval) return `/list?category=${category}&leval=${leval}`
    if (category) return `/list?category=${category}`
    return '/list'

}