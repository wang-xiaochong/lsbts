

export default function (keys: string[]) {
    if (typeof window != 'undefined' && window.location.search) {
        let res: {
            [key: string]: string | null
        } = {}
        let query = new URLSearchParams(window.location.search.substring(1))
        keys.forEach(key => {
            let tmp = query.get(key)
            if (tmp) {
                res[key] = tmp
            }
        })
        return res
    } else {
        return {}
    }
}