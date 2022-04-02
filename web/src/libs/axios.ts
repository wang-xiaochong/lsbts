import Axios from 'axios'


let token = '';
// let lock = false;
if (typeof (window) != 'undefined') {
    token = localStorage.token || ''
}
const axios = Axios.create({
    baseURL: 'https://xscloud.ltd/',
    // baseURL: 'https://localhost:7070/',
    headers: {
        token: token,
    }
});
   
axios.interceptors.response.use(res => {
    if(res.data === 'Processing'){
        return { };
    }
    return res
}, err => {
    if (err.response) {
        alert(err.response.data)
        return err.response.data
    } else {
        alert('网络错误，请稍后重试')
    }
})

export default axios;