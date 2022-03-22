import { CategoryData } from 'models/category';
import React from 'react';
import { Link } from 'react-router-dom';

import * as routers from '@/router'
import { connect, SiteState } from '@/store';
import { getCategory } from './category';



interface Props {
  items?: {
    title: string,
    href: string,
  }[]
}

function Footpoint(props: Props) {
  const { items } = props;

  return (
    <div className="footpoint">
      {items ? items.map((item, index) => (
        <React.Fragment key={index}>
          <Link to={item.href}>{item.title}</Link>
          <span>
            <i className="icon icon-right" />
          </span>
        </React.Fragment>
      )) : ''}
    </div >
  );
}





// siteFootPoint

interface FootpointData {
  ID: number,
  title: string,
}


function getFootpoint(
  categories: CategoryData[],
  category: number,
  level: number): FootpointData[] | undefined {
  if (level === 1) {
    let data = categories.find(item => item.ID === category);
    if (data) {
      return [{
        ID: data.ID,
        title: data.title
      }]
    } else {
      return undefined;
    }
  } else {
    for (let i = 0; i < categories.length; i++) {
      let children = categories[i].children;
      if (children) {
        let res = getFootpoint(children, category, level - 1);
        if (res) {
          return [
            { ID: categories[i].ID, title: categories[i].title },
            ...res
          ]
        }
      }
    }
  }
}

interface footPointProps {
  site?: SiteState,
}

function SiteFootPoint(props: footPointProps) {
  let footPoint: FootpointData[] | undefined;
  const categoryData = props.site?.CategoryData;
  const { category, category_level } = getCategory()
  if (categoryData && category && category_level) {
    footPoint = getFootpoint(categoryData, category, category_level)
  }

  let footPointItems: {
    title: string,
    href: string,
  }[] = [{ title: '全部课程', href: routers.list() }]

  if (footPoint) {
    for (let i = 0; i < footPoint.length; i++) {
      let item = footPoint[i];
      let level = i + 1;
      if (level === 1 || level === 2 || level === 3) {
        footPointItems.push({
          title: item.title,
          href: routers.list(item.ID, level)
        })
      }
    }
  }
  return <Footpoint items={footPointItems} />
}

export default connect(state => state)(SiteFootPoint)
