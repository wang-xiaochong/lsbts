import CommonLeft from '@/components/my/commonLeft';
import CourseTable from '@/components/my/courseTable';
import NavMenu from '@/components/my/navmenu';
import Tabs from '@/components/tabs';
import { connect, Dispatch, UserState, actions, RootState } from '@/store/index'
import { UserOrderData } from 'models/user';
import React, { useState } from 'react';

interface Props {
  user?: UserState,
  dispatch: Dispatch,

}

function MyOrder(props: Props) {

  const [cur, setCur] = useState(0);
  const myOrders = props.user?.myOrders;
  if (!myOrders) { props.dispatch(actions.user.getMyOrder()) }
  let orders: UserOrderData[] = [];
  if (myOrders) {
    orders = myOrders.filter(order => {
      const { status } = order.courses[0];
      switch (cur) {
        case 0: return true;
        case 1: return status === 'init';
        case 2: return status === 'success'
      }
      return false;
    })
  }

  return (
    <>
      < div className="main-container" >
        <div className="main-content">

          <div className="left">
            <NavMenu />
            <CommonLeft />
          </div>

          <div className="right">
            <Tabs cur={cur} onchange={setCur} items={['全部订单', '等待付款', '报名成功']} />
            {myOrders ? (
              <CourseTable items={orders} />
            ) : ''}


          </div>
        </div>
      </div>
    </>
  );
};


export default connect((state: RootState) => state)(MyOrder)