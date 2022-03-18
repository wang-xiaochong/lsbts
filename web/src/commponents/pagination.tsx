import React from 'react';

interface Props {

}

export default function Pagination(props: Props) {
  return (
    <div className="pagination">
      <span className="disabled">上一页</span>
      <span className="active">1</span>
      <span>2</span>
      <span>3</span>
      <span>下一页</span>
    </div>
  );
}