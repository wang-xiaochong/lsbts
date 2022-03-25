import React from 'react';

import { connect, Dispatch, AppState, actions } from '../store';

interface Props {
  app?: AppState;
  dispatch: Dispatch;
}

export default connect(state => state)(function (props: Props) {
  const {
    title = '提示', content,
    visible = false,
    showOk = true, onOk = () => { },
    showCancel = false, onCancel = () => { },
  } = props.app?.alertProps || {};

  if (!visible) return <></>;
  return (
    <>
      <div className="g-alert-shadow" />
      <div className="g-alert">
        <div className="title">
          {title}
          <i className="icon icon-close-grey close-btn" onClick={async () => {
            await onCancel();
            props.dispatch(actions.app.hideAlert());
          }} />
        </div>
        <div className="content">
          {content}
        </div>
        <div className="actions">
          {showOk ? (
            <span className="btn btn-primary" onClick={async () => {
              await onOk();
              props.dispatch(actions.app.hideAlert());
            }}>确定</span>
          ) : ''}
          {showCancel ? (
            <span className="btn btn-default" onClick={async () => {
              await onCancel();
              props.dispatch(actions.app.hideAlert());
            }}>取消</span>
          ) : ''}
        </div>
      </div>
    </>
  );
})