import axios from "@/libs/axios";

export interface UserData {
    ID: number;
    avatar: string;
    nickname: string;
    points: number;
    currency: number;
}


export interface UserCourseProgressData {
    points: number;
    todayCourseSec: number;
    todayCourseRank: number;

}

export interface UserCourseTabData {
    ID: number;
    title: string;
    expires: number;
    progress: number;
}














export async function getUserInfo(): Promise<UserData> {
    // let token = (window.location.search).split('=')[1]
    // let { data } = await axios.get(`/api/user/getUserInfo?token=${token}`)
    let { data } = await axios.get(`/api/user/getUserInfo`)
    return data
}

