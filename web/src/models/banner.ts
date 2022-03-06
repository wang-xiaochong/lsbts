import axios from "@/libs/axios";

export interface BannerData {
    ID: number,
    img: string,
    href: string,
    color:string,
}

export async function getAllBanners():Promise<BannerData[]> {
    let { data } = await axios('/api/site/getAllBanners');
    return data
}
