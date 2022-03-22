export function home() {
    return '/'
}

export function list(category?: number, level?: 1 | 2 | 3) {
    if (category && level) return `/list?category=${category}&level=${level}`
    if (category) return `/list?category=${category}`
    return '/list'

}