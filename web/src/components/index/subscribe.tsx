import React, { useState, useEffect } from 'react';

import Dialog from './subscribe/dialog';
import { Dispatch, actions, UserState, connect, RootState } from '@/store/index'
interface Props {
  user?: UserState,
  dispatch: Dispatch,
}
function Subscribe(props: Props) {
  const mySubscribe = props.user?.mySubscribe
  const cur = props.user?.myCurSubscribe
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    if (!mySubscribe?.find(item => item.ID === cur)) {
      props.dispatch(actions.user.setMyCurSubscribe(0))
    }
  }, [mySubscribe, cur,props]);


  // if (!mySubscribe) {
  //   props.dispatch(actions.user.getMySubscribe());
  // }
 
  return (
    <>
      <div className="subscribe">
        <div className="page">
          <ul className="list">
            {mySubscribe?.map(item => (
              <li
                key={item.ID}
                className={cur === item.ID ? "active" : ""}
                onClick={() => { props.dispatch(actions.user.setMyCurSubscribe(item.ID)) }}
              >
                {item.title}
              </li>
            ))}
          </ul>
          <div className="btn-container">
            <span className="btn" onClick={ev => setDialogVisible(true)}>修改兴趣</span>
          </div>
        </div>
      </div>

      {dialogVisible ? (
        <Dialog onClose={() => setDialogVisible(false)} />
      ) : ''}
    </>
  );
}

export default connect((state: RootState) => state)(Subscribe)