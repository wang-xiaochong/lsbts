import React, { useEffect, useState } from 'react';
// import ReactDOMServer from 'react-dom/server'

import CourseList from '@/commponents/courseList'
import HotTopic from '@/commponents/footer/hotTopic';
import SiteFootPoint from '@/commponents/list/footpoint';
import Keyword from '@/commponents/list/keyword';
import AdAside from '@/commponents/list/adAside';
import CourseFilter from '@/commponents/list/filter'
import Pagination from '@/commponents/pagination'


import CourseCategory, { getCategory } from '@/commponents/list/category'
import { setAppData, AppData } from 'models/app';
import { AppState, CourseState, RootState, actions, connect, Dispatch } from '@/store/index'
import { UserState } from '@/store/modules/user';
import { SiteState } from '@/store/modules/site';
import { CourseListSearchPageSize, FilterOptions, SearchParams } from 'models/course';

import { useLocation } from 'react-router-dom'


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
    const searchCourseResult = props.course?.searchCourseResult;
    const { category, category_level } = getCategory();
    const keyword = props.app?.searchBarKw;

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<FilterOptions>({
        type: undefined,
        options: [],
        sort: 'default'
    })
    // const [categories, setCategories] = useState<SearchParams["categories"]>({})
    const [categories, setCategories] = useState<{[key:string]:string[]}>({})


    useEffect(() => {
        let searchParams: SearchParams = {
            category, category_level, keyword,
            page, filter, categories,
        }
        console.log('seqarch', searchParams)
        props.dispatch(actions.course.getSearchCourse(searchParams))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, category_level, keyword, page, filter, categories])
   
    let categoryDatas = props.course?.searchCategoryData
    // const [categoryDatas, setCategoryDatas] = useState<SearchCategoryData[]>([])

    useEffect(() => {
        props.dispatch(actions.course.getSearchCategoryData({category,category_level}))
    },[category,category_level])


    useLocation();
    //应该是监听路由，参数变后也会重新渲染。内部应该是声明了state，只有state改变时组件才会重新渲染，而URL是属于props属性，props改变并不会引起组件重新渲染。


    return (
        <>
            <div className="main-container page">
                <div className="left">

                    {keyword ? (
                        <Keyword
                            kw={keyword} total={searchCourseResult?.total || 0}
                            onClearKw={() => { props.dispatch(actions.app.setSearchBarKw('')) }}
                        />
                    ) : ''}

                    <SiteFootPoint />

                    {/* coursecategories */}
                    {
                        categoryDatas?.map(item => (
                            <CourseCategory
                                key={item.key}
                                title={item.title}
                                items={item.options}
                                multi={item.allow_multi}
                                value={categories[item.key]}
                                onChange={value => { setCategories({ ...categories, [item.key]: value }) }}
                            />
                        ))
                    }

                    <CourseFilter data={filter} onChange={options => setFilter(options)} />

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
