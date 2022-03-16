import { TopicData } from '@/models/site'
import db from '~/libs/database'
import * as redis from '~/libs/redis'

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
    // redis要
    let result: TopicData[] = await redis.readCache(redis.KEY_APP_TOPICS)
    if (result) return result;

    let topics = await db.all<TopicRow>('topic_table', 'sort', 'asc');
    let items = await db.all<TopicItemRow>('topic_item_table', 'sort', 'asc');
    result = topics.map(topic => {
        return {
            ID: topic.ID,
            title: topic.title,
            children: []
        }
    });

    items.forEach(item => {
        let parent = result.find(data => data.ID === item.topic_id)
        if (parent) parent.children?.push({
            ID: item.ID,
            title: item.title,
        });
    });
    redis.writeCache(redis.KEY_APP_TOPICS, result)
    return result
}

