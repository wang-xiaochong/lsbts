import  db  from '~/libs/database';
import {BannerData} from 'models/banner'

export async function getAllBanners():Promise<BannerData[]> {
    let res = (await db.query('SELECT * FROM banner_table ORDER BY sort ASC'))[0] as BannerData[];
    return res
}

