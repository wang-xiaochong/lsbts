import axios from "@/libs/axios";

export interface CategoryData {
    ID: number;
    title: string;
    items?: CategoryData[];
    children?: CategoryData[];
}

export async function getCategory(): Promise<CategoryData[]> {
    let { data } = await axios('/api/site/getCategories')
    return data
}