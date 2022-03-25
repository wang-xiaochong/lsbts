import query from '@/libs/querystring';

import React from 'react';

interface Props {
  title: string;
  items: string[];
  multi?: boolean;

  value?: string[];
  onChange: (value: string[]) => void;
}

export default function Category(props: Props) {
  const {
    title, items, value = [],
    multi = false,
    onChange
  } = props;
  return (
    <div className="course-category">
      <div className="title">{title}:</div>
      <ul className="options">
        {items.map((item, index) => (
          <li
            key={index}
            className={value.indexOf(item) !== -1 ? 'active' : ''}
            onClick={() => {
              let res: string[];
              if (!multi) {
                res = [item];
              } else {
                let n = value.indexOf(item);
                if (n !== -1) {  //有-删掉
                  res = value.filter(str => item !== str);
                } else {  //没有-加上 
                  res = [...value, item];
                }
              }

              onChange(res);
            }}
          >{item}</li>
        ))}
      </ul>
      {multi ? (
        <span className="multi">多选</span>
      ) : ''}
    </div>
  );
}


export function getCategory(): { category: number; category_level: number } {
  const queryResult = query(['category', 'level'])
  const category = queryResult.category ? Number(queryResult.category) : 0;
  const category_level = queryResult.level ? Number(queryResult.level) : 0;
  return { category, category_level }
}
