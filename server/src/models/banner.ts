import  db  from '~/libs/database';

export interface BannerData{
    ID: number,
    img: string,
    href: string,
    sort:number
}

export async function getAllBanner():Promise<BannerData[]> {
    let [rows] = await db.query('SELECT * FROM banner_table');
    let banners = rows as BannerData[]
    return banners
}

