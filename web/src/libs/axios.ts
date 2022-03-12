import Axios from 'axios'
import store from '@/store/store'
import { restoreToken } from '@/store/actions'

store.dispatch(restoreToken());
var  token  = store.getState().token ||'';

export default Axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        token:token,
    }
})