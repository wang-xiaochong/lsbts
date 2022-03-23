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
    // item_id: number;
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


//course detail 
export interface CourseDetail {
    // 课程数据————course_table
    course: {
        ID: number;
        cover: string;
        title: string;
        price: number;
        total_students: number;
        recently_students: number;
        rank: number;
        isRegisted: number;

        summary: string;
        description: string;

    }

    // 讲师信息
    teachers: TeacherData[];

    // 类目数据————category_table  category_item_table
    category: {
        ID: number;
        title: string;
    }[];


    // 机构信息————agency_table
    agency: {
        avatar: string;
        agency_name: string;
        agency_rank: number;
        total_course: number;
        total_students: number;
        summary: string;
    }

    // 章节————course_chapter course_section course_live course_video
    chapters: CourseChapterData[];

    // 评论————course_comment_table
    comments: CourseCommentData[];
}



