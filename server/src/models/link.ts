import db from '~/libs/database'

import { LinkData } from '@/models/site'
import * as redis from '~/libs/redis'

interface SiteLinkRow {
    ID: number;
    title: string;
    href: string;
    sort: number;
}

export async function getSiteLink(): Promise<LinkData[]> {
    let result: LinkData[] = await redis.readCache(redis.KEY_APP_SITELINK);
    if (result) return result;

    // database
    let rows = await db.all<SiteLinkRow>('site_link_table', 'sort', 'asc')
    result = rows.map(row => {
        return {
            ID: row.ID,
            title: row.title,
            href: row.href,
        }
    })

    return result
}

