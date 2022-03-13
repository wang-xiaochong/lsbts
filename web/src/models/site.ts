import axios from "@/libs/axios";

export interface SubscribeData {
    ID: number;
    title: string;
    children: {
        ID: number;
        title: string;
        checked: boolean;
    }[];
}

export async function getAllSubscribe() {
    let { data } = await axios.get(`/api/site/getAllSubscibe`)
    return data
}