import { CategoryData } from "./category";
import { SearchResult } from "./search";
import { BannerData } from "./banner";
import { CourseSummaryData } from "./course";
import { LinkData, TopicData } from "./site";

export interface AppData {
    // site
    categories?: CategoryData[]
    hotKeyWords?: SearchResult
    banners?: BannerData[]
    topics?: TopicData[],
    links?: LinkData[],

    // course
    courses?: CourseSummaryData[],
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