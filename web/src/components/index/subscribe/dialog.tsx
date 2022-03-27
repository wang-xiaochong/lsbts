import React, { useState } from 'react';
import { SubscribeData, SubscribeItem } from '@/models/site';
import { connect, SiteState, Dispatch, actions, RootState, UserState } from '@/store/index'


interface Props {
  onClose: () => void;
  user?: UserState;
  site?: SiteState;
  dispatch: Dispatch;
}

const MAX_SELECT = 6;

function Dialog(props: Props) {
  const [mySubscribe, setMySubscribe] = useState(props.user?.mySubscribe ? [...props.user?.mySubscribe] : [])
  const allSubscribe = props.site?.SubscribeData

  if (!allSubscribe) {
    props.dispatch(actions.site.getAllSubscribeData());
  }
  if (!mySubscribe) {
    props.dispatch(actions.user.getMySubscribe());
  }

  const isChecked = (item: { ID: number }) => {
    if (!mySubscribe) return false;
    else return mySubscribe.find(myitem => (myitem.ID === item.ID));
  }

  const triggerCheck = (item: SubscribeItem) => {
    let newData = [...mySubscribe];
    let index = mySubscribe.findIndex(myitem => (
      myitem.ID === item.ID
    ))
    if (index !== -1) {
      newData.splice(index, 1)
    } else {
      if (newData.length - 1 < MAX_SELECT) { // 0是默认推荐
        newData.push(item)
      } else {
        alert(`最多选择${MAX_SELECT}个`)
      }
    }
    setMySubscribe(newData)
  }

  const saveMySubscribe = (newMySubscribe: SubscribeData[]) => {
    const token = props.user?.token
    if (token) {
      props.dispatch(actions.user.submitMySubscribe(newMySubscribe))
    } else {
      alert('请登录后再设置')
    }
    props.onClose()
  }




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
          <span>已选择 {mySubscribe ? mySubscribe.length - 1 : 0}/{MAX_SELECT} 个学院</span>
        </h3>
        <div>
          {list.map((data, index) => (
            <ul className="list" key={index}>
              {data.map(item => (
                <li className="items" key={item.ID}>
                  <h4 className="item-title">{item.title}</h4>
                  <ul className="options">
                    {item.children?.map(item => (
                      <li
                        className={`op ${isChecked(item) ? 'active' : ''}`}
                        key={item.ID}
                        onClick={ev => triggerCheck(item)}
                      >{item.title}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="btns">
          <div className="btn btn-default" onClick={props.onClose}>下次再选</div>
          <div className="btn btn-primary" onClick={ev => saveMySubscribe(mySubscribe)}>保存</div>
        </div>
      </div >
    </>
  );

};

export default connect((state: RootState) => {
  return state;
})(Dialog);