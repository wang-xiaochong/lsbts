import React from 'react';
// import ReactDOMServer from 'react-dom/server'
import CourseList from '@/commponents/courseList'
import Alert from '@/commponents/alert';


import { setAppData, AppData } from 'models/app';
import { AppState, CourseState, RootState } from '@/store/index'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { UserState } from '@/store/modules/user';
import { SiteState } from '@/store/modules/site';
import HotTopic from '@/commponents/footer/hotTopic';


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
        <div>
            <CourseList title='课程列表' data={[]} />
            <HotTopic />
            <Alert />
        </div>
    );
}

export default connect((state: RootState) => {
    return state
})(List);
