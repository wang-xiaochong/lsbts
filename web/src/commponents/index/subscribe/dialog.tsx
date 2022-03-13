import React, { useEffect, useState } from 'react';
import { SubscribeData } from '@/models/site';
import { connect } from 'react-redux';
import { SiteState } from '@/store/modules/site';
import { Dispatch } from 'redux';
import actions from '@/store/actions';

interface Props {
  onClose: () => void;
  site?: SiteState;
  dispatch: Dispatch;
}

function Dialog(props: Props) {
  const [allSubscribe, setAllSubscribe] = useState<SubscribeData[] | undefined>(props.site?.SubscribeData)
  useEffect(() => {
    if (!allSubscribe) {
      props.dispatch(actions.site.getSubscribeData());
    }
  }, [allSubscribe])

  //拆成左右两边
  const list: SubscribeData[][] = [
    [], []
  ];
  allSubscribe?.forEach((data: SubscribeData, index: number) => {
    list[index % 2].push(data);
  });
  return (
    <>
      <div className="g-subscribe-shadow" onClick={props.onClose} />
      <div className="g-subscribe-dialog">
        <h3 className="title">
          设置学习兴趣
          <span>已选择 4/6 个学院</span>
        </h3>
        <div>
          {list.map((data, index) => (
            <ul className="list" key={index}>
              {data.map(item => (
                <li className="items" key={item.ID}>
                  <h4 className="item-title">{item.title}</h4>
                  <ul className="options">
                    {item.children.map(item => (
                      <li className={`op ${item.checked ? 'active' : ''}`} key={item.ID}>{item.title}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="btns">
          <div className="btn btn-default" onClick={props.onClose}>下次再选</div>
          <div className="btn btn-primary">保存</div>
        </div>
      </div >
    </>
  );




};

export default connect(state => {
  return state;
})(Dialog);