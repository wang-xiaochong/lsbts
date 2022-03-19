import React, { useEffect, useState } from 'react';
// import ReactDOMServer from 'react-dom/server'

import CourseList from '@/commponents/courseList'
import HotTopic from '@/commponents/footer/hotTopic';

import Keyword from '@/commponents/list/keyword';
import Footpoint from '@/commponents/list/footpoint';
import AdAside from '@/commponents/list/adAside';
import CourseCategory from '@/commponents/list/category'
import CourseFilter from '@/commponents/list/filter'
import Pagination from '@/commponents/pagination'



import { setAppData, AppData } from 'models/app';
import { AppState, CourseState, RootState, actions } from '@/store/index'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { UserState } from '@/store/modules/user';
import { SiteState } from '@/store/modules/site';
import { SearchParams } from 'models/course';




interface Props {
    appData?: AppData;
    app?: AppState;
    user: UserState;
    site: SiteState;
    course?: CourseState;
    dispatch: Dispatch;
}




function List(props: Props) {
    props.appData && setAppData(props.appData);
    const [searchParams, setSearchParams] = useState<SearchParams>({
        category: 0,
        category_leval: 0,
        page: 0,
        categories: {},
        filter: {
            type: undefined,
            options: [],
            sort: 'default'
        }
    })
    const listCourseList = props.course?.searchCourseList;
    const searchBarKw = props.app?.searchBarKw
    useEffect(() => {
        // console.log('search', searchParams)
        searchParams.ketword = searchBarKw
        props.dispatch(actions.course.getSearchCourse(searchParams))

    }, [searchParams, searchBarKw])


    const categories = [
        {
            key: 'type',
            title: '分类',
            multi: false,
            items: [
                { ID: 2, title: 'Java' },
                { ID: 3, title: 'python' }
            ]
        },
        {
            key: 'cate_1',
            title: '知识点',
            multi: true,
            items: [
                { ID: 3, title: 'c++' },
                { ID: 4, title: '数据库' }
            ]
        }
    ]

    return (
        <>
            <div className="main-container page">
                <div className="left">
                    
                    {searchBarKw ? (
                        <Keyword
                            kw={searchBarKw} total={185}
                            onClearKw={()=>{props.dispatch(actions.app.setSearchBarKw(''))}}
                        />
                    ) : ''}

                    <Footpoint items={[
                        { title: 'IT互联网', href: '/list/1' },
                        { title: 'Java开发', href: '/list/1/java' },
                    ]} />

                    {/* coursecategories */}
                    {
                        categories.map(item => (
                            <CourseCategory
                                key={item.key}
                                title={item.title}
                                items={item.items}
                                multi={item.multi}
                                value={searchParams.categories[item.key]}
                                onChange={value => {
                                    setSearchParams({
                                        ...searchParams, categories: {
                                            ...searchParams.categories,
                                            [item.key]: value,
                                        }
                                    });
                                }}
                            />
                        ))
                    }

                    <CourseFilter data={searchParams.filter} onChange={options => setSearchParams({
                        ...searchParams, filter: options
                    })} />
                    <CourseList title="课程列表" data={listCourseList} />
                    <Pagination />
                </div>
                <div className="right">
                    <AdAside />
                </div>
            </div>

            <HotTopic />
        </>

    );
}

export default connect((state: RootState) => {
    return state
})(List);
