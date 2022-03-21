import React, { useEffect, useState } from 'react';
// import ReactDOMServer from 'react-dom/server'

import CourseList from '@/commponents/courseList'
import HotTopic from '@/commponents/footer/hotTopic';

import Keyword from '@/commponents/list/keyword';
import AdAside from '@/commponents/list/adAside';
import CourseCategory, { getCategory } from '@/commponents/list/category'
import CourseFilter from '@/commponents/list/filter'
import Pagination from '@/commponents/pagination'


import { setAppData, AppData } from 'models/app';
import { AppState, CourseState, RootState, actions } from '@/store/index'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { UserState } from '@/store/modules/user';
import { SiteState } from '@/store/modules/site';
import { CourseListSearchPageSize, SearchParams } from 'models/course';

import { useLocation } from 'react-router-dom'
import { SiteFootPoint } from '@/commponents/list/footpoint';

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
    const { category, category_leval } = getCategory()

    const [searchParams, setSearchParams] = useState<SearchParams>({
        category: category ? Number(category) : 0,
        category_leval,
        keyword: '',
        page: 1,
        categories: {},
        filter: {
            type: undefined,
            options: [],
            sort: 'default'
        }
    })


    const searchCourseResult = props.course?.searchCourseResult;
    const searchBarKw = props.app?.searchBarKw;
    const [page, setPage] = useState(1)


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

    useLocation();
    //应该是监听路由，参数变后也会重新渲染。内部应该是声明了state，只有state改变时组件才会重新渲染，而URL是属于props属性，props改变并不会引起组件重新渲染。

    // useEffect(() => {
    //     var { category, leval } = query(['category', 'leval'])
    //     setSearchParams({
    //         ...searchParams,
    //         category: category ? Number(category) : 0,
    //         category_leval: leval ? Number(leval) : 0,
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [window.location.search])

    useEffect(() => {
        // console.log(category, leval)
        setSearchParams({
            ...searchParams,
            category: category,
            category_leval: category_leval,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, category_leval])

    useEffect(() => {
        setSearchParams({
            ...searchParams,
            keyword: searchBarKw,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchBarKw])

    useEffect(() => {
        setSearchParams({
            ...searchParams,
            page: page,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    // do search
    useEffect(() => {
        console.log('seqarch', searchParams)
        props.dispatch(actions.course.getSearchCourse(searchParams))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])


    return (
        <>
            <div className="main-container page">
                <div className="left">

                    {searchBarKw ? (
                        <Keyword
                            kw={searchBarKw} total={searchCourseResult?.total || 0}
                            onClearKw={() => { props.dispatch(actions.app.setSearchBarKw('')) }}
                        />
                    ) : ''}

                    <SiteFootPoint />


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


                    <CourseList data={searchCourseResult?.data} />


                    <Pagination
                        cur={page}
                        total={searchCourseResult?.total || 0}
                        pageSize={CourseListSearchPageSize}
                        onChange={value => setPage(value)}
                    />


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
