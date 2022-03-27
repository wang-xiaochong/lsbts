import React from 'react';
import { useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'
import Banner from '@/components/index/banner'
import Subscribe from '@/components/index/subscribe'
import CourseList from '@/components/courseList'

import { setAppData, AppData } from 'models/app';
import { actions, AppState, CourseState, RootState } from '@/store/index'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { getAllSubscribeData } from '@/store/actions/site';
import { UserState } from '@/store/modules/user';
import { SiteState } from '@/store/modules/site';
import HotTopic from '@/components/footer/hotTopic';
import { CategoryData } from 'models/category';

interface Props {
  appData?: AppData;
  app?: AppState;
  user: UserState;
  site: SiteState;
  course?: CourseState;
  dispatch: Dispatch;
}

interface CourseListMetas {
  category: number;
  title: string;
}

function Home(props: Props) {
  props.appData && setAppData(props.appData);
  const indexCourseList = props.course?.indexCourseList


  // const allCourse = props.site.SubscribeData;
  // if (!allCourse) props.dispatch(actions.site.getAllSubscribeData())
  // console.log(allCourse)



  // let courseListMetas = [
  //   { category: 1, title: 'IT互联网热门课程' },
  //   { category: 4, title: '设计创作热门课程' }
  // ]
  let courseListMetas: CourseListMetas[] = [];
  if (props.site.SubscribeData && props.user.mySubscribe) {
    courseListMetas = getCourseListMetas(props.site.SubscribeData, props.user.mySubscribe)
  }

  if (indexCourseList) {
    courseListMetas.forEach(({ category }) => {
      if (!indexCourseList[category])
        props.dispatch(actions.course.getIndexCourseSummary(category))
    })
  }

  if (!props.site.SubscribeData) {
    props.dispatch(getAllSubscribeData())
  }


  return (
    <div>
      <Banner />
      <Subscribe />
      {
        indexCourseList ? courseListMetas.map(item => (
          <CourseList key={item.category} title={item.title} data={indexCourseList[item.category]} />
        )) : ''
      }

      <div className='all-course page'>
        <a href='/list'>查看全部课程 &gt;</a>
      </div>
      <HotTopic title='热门知识' />
    </div>
  );
}

export default connect((state: RootState) => {
  return state
})(Home);

// export function render() {
//   return ReactDOMServer.renderToString(<App />)
//   // return ReactDOMServer.renderToStaticMarkup(<App/>)
// }

function getCourseListMetas(categories: CategoryData[], mySubscribe: CategoryData[]): CourseListMetas[] {
  let result: CourseListMetas[] = [];
  let arr = mySubscribe.map(item => {
    let data = categories.find(category => category.children?.find(
      data => data.ID === item.ID
    ))
    if (data) {
      return {
        category: data.ID,
        title: data.title
      }
    } else return null
  }) as CourseListMetas[];
  // 去空
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      arr.splice(i, 1)
      i--;
    }
  }
  // 去重
  arr.forEach(item => {
    if (!result.find(data => data.category === item.category))
      result.push(item)
  })
  return result
}

