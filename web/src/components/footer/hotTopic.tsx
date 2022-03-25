import React, { useState } from 'react';

import { RootState, Dispatch, SiteState, connect, actions } from '@/store/index'

interface Props {
  title?: string,
  site?: SiteState,
  dispatch: Dispatch,
}

function HotTopic(props: Props) {
  const topics = props.site?.topics;
  if (!topics) {
    props.dispatch(actions.site.getTopics())
  }
  const [cur, setCur] = useState(0);



  return (
    <div className="ad-bottom">
      {props.title ? (<h4 className="cap">{props.title}</h4>) : ''}
      <ul className="tabs page">
        {
          topics?.map((item, index) => (
            <li
              className={`tab-item ${index === topics.length - 1 ? 'last' : ''} ${index === cur ? 'active' : ''}`}
              key={item.ID}
              onClick={() => setCur(index)}
            >{item.title}</li>
          ))
        }
      </ul>
      {
        topics ? (
          <div className="content page">
            {
              topics[cur].children?.map(item => (
                <a href={`/search?kw=${item.title}`} key={item.ID}>{item.title}</a>
              ))
            }
          </div>
        ) : ''
      }

    </div>
  );
}

export default connect((state: RootState) => { return state })(HotTopic)