import { TopicData } from '@/models/site'
import db from '~/libs/database'

interface TopicRow {
    ID: number;
    title: string;
    sort: number;
}

interface TopicItemRow {
    ID: number;
    topic_id: number;
    title: string;
    sort: number;
}

export async function getTopics(): Promise<TopicData[]> {
    let topics = await db.all<TopicData>('topic_table');
    let items = await db.all<TopicItemRow>('topic_item_table');
    return []
}

