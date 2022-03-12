import  db  from '~/libs/database';
import {BannerData} from 'models/banner'

export async function getAllBanners():Promise<BannerData[]> {
    return await db.query('SELECT * FROM banner_table ORDER BY sort ASC');
}

