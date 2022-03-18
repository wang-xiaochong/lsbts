import React from 'react';
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
import { AppState, CourseState, RootState } from '@/store/index'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { UserState } from '@/store/modules/user';
import { SiteState } from '@/store/modules/site';




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

    return (
        <>
            <div className="main-container page">
                <div className="left">
                    <Keyword kw="javascript" total={185} />
                    <Footpoint items={[
                        { title: 'IT互联网', href: '/list/1' },
                        { title: 'Java开发', href: '/list/1/java' },
                    ]} />

                    <CourseCategory title='分类' value={[]} items={[{ ID: 2, title: 'Java' }, { ID: 3, title: 'python' }]} />
                    <CourseCategory title='知识点' value={[]} multi items={[{ ID: 3, title: 'c++' }, { ID: 4, title: '数据库' }]} />
                

                    <CourseFilter />
                    <CourseList title="课程列表" data={[]} />
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
