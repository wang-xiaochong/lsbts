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
    category_leval: number,
    page: number,
    categories: {
        [key: string]: number[],
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
