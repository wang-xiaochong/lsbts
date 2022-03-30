import Axios from 'axios'


let token = '';
if (typeof (window) != 'undefined') {
    token = localStorage.token || ''
}
const axios = Axios.create({
    // baseURL: 'http://82.156.109.119:7070/',
    baseURL: 'https://localhost:7070/',
    headers: {
        token: token,
    }
});

// axios.interceptors.request.use(req => {
//     // console.log(req)
//     return req
// })
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