import Axios from 'axios'

let token = '';

if (typeof (window) != 'undefined') {
    token = localStorage.token
}

export default Axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        token: token,
    }
})