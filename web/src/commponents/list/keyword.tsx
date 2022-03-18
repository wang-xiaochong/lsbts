import React from 'react';

interface Props {
  kw: string;
  total: number;
}

export default function Keyword(props: Props) {
  const { kw, total } = props;

  return (
    <div className="search-info">
      <div className="keyword">
        关键词:
        <span className="bold kw">{kw}</span>
        <i className="icon icon-close-grey" />
      </div>
      <div className="info">
        共找
        <span className="bold">{total}</span>门
        <span className="bold">"{kw}"</span>
        相关课程
      </div>
    </div>
  );
}