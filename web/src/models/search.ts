import axios from "@/libs/axios"

export type SearchResult = String[]

export async function getHotKeyWords(): Promise<SearchResult> {
    let { data } = await axios('/api/site/getHotKeyWords')
    return data
}