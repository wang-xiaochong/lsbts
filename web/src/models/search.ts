import axios from "@/libs/axios"

export type SearchResult = String[]

export async function getHotKeyWords(): Promise<SearchResult> {
    let { data } = await axios('/api/site/getHotKeyWords')
    return data
}

export async function getSuggest(kw:string): Promise<SearchResult> {
    let { data } = await axios(`/api/site/getSuggest/${kw}`)
    return data
}


