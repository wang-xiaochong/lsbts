

import { Footpoint } from '@/commponents/footpoint'
import AgencyDetail from '@/commponents/course/agencyDetail';
import CourseChapter from '@/commponents/course/courseChapter';
import CourseComment from '@/commponents/course/courseComment';
import CourseDescription from '@/commponents/course/courseDescription';
import CourseInfo from '@/commponents/course/courseInfo';
import CourseVideo from '@/commponents/course/courseVideo';
import Tabs from '@/commponents/course/tabs';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { CourseState, connect, RootState, Dispatch, actions } from '@/store';
import * as routers from '../router'
import { LiveData, VideoData } from 'models/course';


interface Props {
    course?: CourseState
    dispatch: Dispatch
}

function Course(props: Props) {
    const params = useParams<{ id: string }>();
    const [cur, setCur] = useState(0);

    let id = Number(params.id)
    const courseDetail = props.course?.courseDetail
    if (!courseDetail) {
        props.dispatch(actions.course.getCourseDetail(id))
    }

    if (!courseDetail) {
        return (
            <div className="main-container">
                loading...
            </div>
        )
    }


    const { course, teachers, category, agency, chapters, comments } = courseDetail

    // footpoint
    const footPointItems: {
        title: string,
        href: string,
    }[] = [
            { title: '全部课程', href: routers.list() },

            ...category.map(({ ID, title }, index) => {
                let level: 1 | 2 | 3 = 1;
                let l = index + 1;
                if (l === 1 || l === 2 || l === 3) { level = l }
                return {
                    title,
                    href: routers.list(ID, level)
                }
            }),

            { title: course.title, href: routers.course(id) }
        ]

    // Course Video
    const courseVideoItems: {
        type: 'live' | 'video';
        title: string;
        time: number;
    }[] = []

    chapters.forEach(chapter => {
        chapter.sections.forEach(({ ID, title, type, item }) => {
            
            if (type === 'live') {
                courseVideoItems.push({
                    type: 'live',
                    title,
                    time: (item as LiveData).start_time,
                })
            } else if (type === 'video') {
                courseVideoItems.push({
                    type: 'video',
                    title,
                    time: (item as VideoData).duration,
                })
            }

        })
    })

    courseVideoItems.sort((item1, item2) => {
        let t1 = item1.type === 'live' ? 0 : 1;
        let t2 = item2.type === 'live' ? 0 : 1;
        return t1 - t2;
    })




    return (
        <div className="main-container">
            <div className="course-header">
                <div className="page">

                    <Footpoint items={footPointItems} />

                    <CourseVideo
                        cover={course.cover}
                        course_id={id}
                        items={courseVideoItems}
                    />


                    <CourseInfo
                        course_id={id}
                        title='Java高级'
                        price={98}
                        total_students={500}
                        recently_students={200}
                        rank={0.98}
                        isRegisted={false}

                    />

                </div>
            </div>
            <div className="course-content">
                <div className="page">
                    <div className="course-detail">

                        <Tabs
                            items={['课程概述', '目录', '评论(2)']}
                            cur={cur}
                            onchange={index => setCur(index)}
                        />

                        <div className="course-assets">
                            <span className="left">课程配套资料领取</span>
                            <span className="right">
                                联系老师
                                <i className="icon icon-right" />
                            </span>
                        </div>
                        <div className="course-items">
                            {
                                [
                                    <CourseDescription
                                        teachers={[]}
                                        summary=''
                                        description=''
                                    />,

                                    <CourseChapter
                                        chapters={[]}
                                    />,

                                    <CourseComment comments={[]} />,
                                ][cur]
                            }

                        </div>
                    </div>
                    <AgencyDetail
                        avatar='/image/tmp_avatar.jpg'
                        agency_name='xx学院'
                        agency_rank={0.98}
                        total_course={98}
                        total_students={4156469}
                        summary='简介'
                    />



                </div>
            </div>
        </div>
    );
}

export default connect((state: RootState) => state)(Course)