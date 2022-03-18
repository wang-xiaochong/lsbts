import React from 'react';

interface Props {
  title: string,
  value?: number[],
  items: {
    ID: number;
    title: string;
  }[],
  multi?: boolean,
}

export default function Category(props: Props) {
  const { title, items, multi, value } = props
  return (
    <div className="course-category">
      <div className="title">{title}:</div>
      <ul className="options">
        <li className="active">全部</li>
        {items ? items.map(item => (
          <li key={item.ID} className={value?.indexOf(item.ID) !== -1 ? 'active' : ''} >{item.title}</li>
        )) : ''}
      </ul>
      {
        multi ? (<span className='multi'>多选</span>) : ''
      }
    </div>
  );
}