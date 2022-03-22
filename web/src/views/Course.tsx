import AgencyDetail from '@/commponents/course/agencyDetail';
import CourseChapter from '@/commponents/course/courseChapter';
import CourseComment from '@/commponents/course/courseComment';
import CourseDescription from '@/commponents/course/courseDescription';
import CourseInfo from '@/commponents/course/courseInfo';
import CourseVideo from '@/commponents/course/courseVideo';
import Tabs from '@/commponents/course/tabs';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

interface Props {

}

export default function Course(props: Props) {


    const params = useParams<{ id: string }>();
    let id = Number(params.id)
    const [cur, setCur] = useState(0);

    return (
        <div className="main-container">
            <div className="course-header">
                <div className="page">
                    <div className="placeholder">
                        公用footpoint组件-省略
                    </div>
                    <CourseVideo
                        cover={'/image/tmp_course_1.jpg'}
                        course_id={id}
                        items={[]}
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
                    <AgencyDetail />



                </div>
            </div>
        </div>
    );
}