import { CategoryData } from "./category";
import { SearchResult } from "./search";

export interface AppData {
    categories: CategoryData[] | undefined
    hotKeyWords: SearchResult | undefined
}

export function setAppData(data: AppData) {
    appData = data
}

// export let appData: AppData = {
//     categories: undefined,
// }



export let appData: AppData;
if (typeof window != 'undefined') {
    appData = (window as any).appData
} else {
    appData = {
        categories: undefined,
        hotKeyWords: undefined,
    }
}