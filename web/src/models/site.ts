
export interface SubscribeItem {
    ID: number;
    title: string;
}


export interface SubscribeData {
    ID: number;
    title: string;
    children?: SubscribeItem[];
}
