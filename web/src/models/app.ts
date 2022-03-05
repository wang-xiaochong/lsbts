import { CategoryData } from "./category";

export interface AppData {
    categories: CategoryData[] | undefined
}

export function setAppData(data: AppData) {
    appData = data
}

export let appData: AppData = {
    categories: undefined,
}