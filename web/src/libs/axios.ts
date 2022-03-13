import Axios from 'axios'
import store from '@/store/index'
import { restoreToken } from '@/store/actions/user'

let token = '';

if (typeof (window) != 'undefined') {
    store.dispatch(restoreToken());
    token = store.getState().user.token || '';
}

export default Axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        token: token,
    }
})