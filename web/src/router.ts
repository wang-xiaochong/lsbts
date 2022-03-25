export function home() {
    return '/'
}

export function list(category?: number, level?: 1 | 2 | 3) {
    if (category && level) return `/list?category=${category}&level=${level}`
    if (category) return `/list?category=${category}`
    return '/list'
}

export function course(courseID: number) {
    return `/course/${courseID}`;
}

export function video(sectionID: number) {
    return `/video/${sectionID}`;
}

export function my() {
    return `/my`;
}

export function myOrder() {
    return `my/order`;
}




export function push(url: string) {
    window.open(url)
}