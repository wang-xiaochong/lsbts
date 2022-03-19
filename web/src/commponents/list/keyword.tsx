import React from 'react';
import { Dispatch, connect, RootState, AppState } from '@/store/index'
interface Props {
  kw: string;
  total: number;
  app?: AppState
  onClearKw:()=>void,
  dispatch: Dispatch
}

function Keyword(props: Props) {
  const { kw, total } = props;

  return (
    <div className="search-info">
      <div className="keyword">
        关键词:
        <span className="bold kw">{kw}</span>
        <i className="icon icon-close-grey" onClick={props.onClearKw} />
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

export default connect((state: RootState) => {
  return state
})(Keyword);