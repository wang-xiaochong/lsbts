
export interface SubscribeItem {
    ID: number;
    title: string;
}


export interface SubscribeData {
    ID: number;
    title: string;
    children?: SubscribeItem[];
}


export interface TopicData {
    ID: number;
    title: string;
    children?: TopicData[];
}

export interface LinkData {
    ID: number;
    title: string;
    href: string;
}