export interface CourseSummaryData {
    ID: number,
    title: string,
    cover: string,
    price: number,
    recent_order_count: number,
    section_count: number,

    //
    agency_id: number,
    agency_name: string,

}
export const CourseListSearchPageSize = 24;
// search
export interface SearchParams {
    keyword?: string,
    category: number,
    category_level: number,
    page: number,
    categories: {
        [key: string]: string[],
    },
    filter: FilterOptions,
}

export interface FilterOptions {
    type?: 'free' | 'cost',
    options: ('video' | 'live' | 'playback' | 'auth' | 'living')[],
    sort: 'default' | 'rank' | 'students' | 'price',
}


export interface SearchCourseResult {
    data: CourseSummaryData[],
    total: number,
}

//类目选项
export interface SearchCategoryData {
    key: number;
    title: string;
    options: string[];
    allow_multi: boolean;
}

// ad
export interface AdCourseData {
    ID: number,
    title: string,
    cover: string;
    price: number;
    agency_id: number;
    agency_name: string;
}

// teacher
export interface TeacherData {
    ID: number;
    name: string;
    title: string;
    summary: string;
    avatar: string;
}

// chapter section
export interface CourseChapterData {
    ID: number;
    title: string;
    sections: CourseSectionData[];
}
export interface CourseSectionData {
    ID: number;
    title: string;
    type: 'live' | 'video' | 'read' | 'download';
    item_id: number;
    item: VideoData | LiveData | ReadData | DownloadData;
}
export interface VideoData {
    ID: number;
    videoID: string;
    duration: number;
}
export interface LiveData {
    ID: number;
    liveID: string;
    start_time: number;
    end_time: number;
}

export interface ReadData {
    ID: number;
}

export interface DownloadData {
    ID: number;
    fileID: string;
    size: number;
}

// comment
export interface CourseCommentData {
    ID: number;
    rank: number;
    time: number;
    course_time: number;
    content: string;
    avatar: string;
    nickname: string;
}



