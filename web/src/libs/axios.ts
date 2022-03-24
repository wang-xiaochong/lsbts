import Axios from 'axios'


let token = '';
if (typeof (window) != 'undefined') {
    token = localStorage.token
}
const axios = Axios.create({
    baseURL: 'http://82.156.109.119:7070/',
    // baseURL: 'http://localhost:8080/',
    // baseURL: 'http://localhost:7001/',
    headers: {
        token: token,
    }
});
axios.interceptors.response.use(res => {
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