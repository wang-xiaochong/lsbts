import React, { useState } from 'react';

import Dialog from './subscribe/dialog';
import { Dispatch, actions, UserState, connect, RootState } from '@/store/index'
interface Props {
  user?: UserState,
  dispatch: Dispatch,
}
function Subscribe(props: Props) {
  const mySubscribe = props.user?.mySubscribe
  if (!mySubscribe) {
    props.dispatch(actions.user.getMySubscribe());
  }
  const [cur] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  return (
    <>
      <div className="subscribe">
        <div className="page">
          <ul className="list">
            {mySubscribe?.map(item => (
              <li key={item.ID} className={cur === item.ID ? "active" : ""}>
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