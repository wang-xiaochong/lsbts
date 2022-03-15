import Axios from 'axios'
import { actions } from '@/store/index';
import common from '@/libs/common';


let token = '';
if (typeof (window) != 'undefined') {
    token = localStorage.token
}
const axios = Axios.create({
    baseURL: 'http://localhost:8080/',
    // baseURL: 'http://localhost:7001/',
    headers: {
        token: token,
    }
});
axios.interceptors.response.use(res => {
    return res
}, err => {
    if (common.dispatch) {
        common.dispatch(actions.app.showAlert({ content: err.response.data }))
    }
})

export default axios;