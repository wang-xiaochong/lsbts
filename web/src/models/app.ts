import { CategoryData } from "./category";
import { SearchResult } from "./search";
import { BannerData } from "./banner";

export interface AppData {
    categories?: CategoryData[]
    hotKeyWords?: SearchResult
    banners?: BannerData[]
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
        // categories: undefined,
        // hotKeyWords: undefined,
        // banners: undefined,
    }
}