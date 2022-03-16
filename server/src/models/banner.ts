import db from '~/libs/database';
import { BannerData } from 'models/banner'
interface bannerRow {
    ID: number,
    img: string,
    href: string,
    sort: number,
    color: string,
}
export async function getAllBanners(): Promise<BannerData[]> {
    return await db.all<bannerRow>('banner_table', 'sort', 'asc');
}

