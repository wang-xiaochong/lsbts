import axios from "@/libs/axios";

export interface UserData {
    ID: number;
    avatar: string;
    nickname: string;
    points: number;
    currency: number;
}

export async function getUserInfo(): Promise<UserData> {
    let token = (window.location.search).split('=')[1]
    let { data } = await axios.get(`/api/user/getUserInfo?token=${token}`)
    return data
}

