import React from 'react';

interface Props {
  title: string,
  value?: number[],
  onChange: (value: number[]) => void,
  items: {
    ID: number;
    title: string;
  }[],
  multi?: boolean,
}

export default function Category(props: Props) {
  const { title, items, multi = false, value = [], onChange } = props
  return (
    <div className="course-category">
      <div className="title">{title}:</div>
      <ul className="options">
        {items ? items.map(item => (
          <li
            key={item.ID}
            onClick={() => {
              let result: number[];
              if (!multi) {
                result = [item.ID]
              } else {
                let n = value?.indexOf(item.ID)
                if (n !== -1) {
                  result = value?.filter(ID => item.ID !== ID)
                } else {
                  result = [...value, item.ID]
                }
              }
              onChange(result);
            }}
            className={value?.indexOf(item.ID) !== -1 ? 'active' : ''}
          >{item.title}</li>
        )) : ''}
      </ul>
      {
        multi ? (<span className='multi'>多选</span>) : ''
      }
    </div>
  );
}