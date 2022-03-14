import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import actions from '@/store/actions';
import { SiteState } from './modules/site';
import { UserState } from './modules/user';

// 合到一起导出

export {
    connect,actions,
}
export type {
    Dispatch,SiteState,UserState,
}

export interface RootState {
    user: UserState,
    site: SiteState,
}