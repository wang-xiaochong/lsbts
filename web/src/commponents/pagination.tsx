import React, { ReactChild } from 'react';

interface Props {
  cur: number;
  onChange: (value: number) => void;
  // totalPage: number;
  total: number;
  pageSize: number;
}

export default function Pagination(props: Props) {
  const { cur, total, pageSize, onChange } = props;
  const totalPage = Math.ceil(total / pageSize);

  if(totalPage<=1) return <></>

  const allPage = (fn: (item: number | string,index:number) => ReactChild) => {
    let pages: (number | string)[] = [];

    const add = (i: number) => {
      if (
        //不能重复
        pages.indexOf(i) === -1 &&

        //不能超出有效范围
        i >= 1 && i <= totalPage
      ) pages.push(i);
    };

    //1,2
    add(1); //?
    add(2); //?

    //...
    if (cur - 1 >= 4) pages.push('...');

    //cur-1, cur, cur+1
    //4, ...
    add(cur - 1);
    add(cur);
    add(cur + 1);

    //...
    if (cur + 1 < totalPage - 2) pages.push('...');

    //total-1, total
    add(totalPage - 1);
    add(totalPage);

    //
    return pages.map(fn);
  };

  return (
    <div className="pagination">
      <span className={cur === 1 ? 'disabled' : ''} onClick={() => {
        if (cur > 1) onChange(cur - 1);
      }}>上一页</span>

      {allPage((item,index) => (
        <span key={index}  className={item === cur ? 'active' : ''} onClick={() => {
          if (item !== cur && typeof item !== 'string') onChange(item);
        }}>{item}</span>
      ))}

      <span className={cur === totalPage ? 'disabled' : ''} onClick={() => {
        if (cur < totalPage) onChange(cur + 1);
      }}>下一页</span>
    </div>
  );
}