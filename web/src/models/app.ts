import { CategoryData } from "./category";
import { SearchResult } from "./search";
import { BannerData } from "./banner";
import { LinkData, TopicData } from "./site";

export interface AppData {
    categories?: CategoryData[]
    hotKeyWords?: SearchResult
    banners?: BannerData[]
    topics?: TopicData[],
    links?:LinkData[],
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