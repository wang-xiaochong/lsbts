
export interface SubscribeData {
    ID: number;
    title: string;
    children?: {
        ID: number;
        title: string;
    }[];
}
