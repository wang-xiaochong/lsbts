import React, { useState } from 'react';

import Dialog from './subscribe/dialog';

interface Props {

}

export default function Subscribe(props: Props) {
  const [cur] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);

  const items = [
    { ID: 0, title: '精选推荐' },
    { ID: 3, title: 'Java开发' },
    { ID: 8, title: '平面设计' },
    { ID: 11, title: '职业技能' },
    { ID: 26, title: '高中' },
    { ID: 27, title: '实用英语' },
    { ID: 30, title: '文艺修养' },
  ];

  return (
    <>
      <div className="subscribe">
        <div className="page">
          <ul className="list">
            {items.map(item => (
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