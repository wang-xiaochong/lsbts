import Axios from 'axios'

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
    console.log(err.response.data)
    throw err;
})

export default axios;