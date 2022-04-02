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



let pending: any[] = []; //声明一个数组用于存储每个请求的取消函数和axios标识
let cancelToken = Axios.CancelToken;
let removePending = (config: any,orgin:string) => {
    // console.log(config);

    pending.forEach((value, index) => {
        if (orgin === 'req' && value.url === axios.defaults.baseURL + config.url) { //在当前请求在数组中存在时执行取消函数
            value.f(); //执行取消操作
        }
          if (orgin === 'res' && value.url === axios.defaults.baseURL + config.url) { //在当前请求在数组中存在时执行取消函数
            pending.splice(index, 1); //根据具体情况决定是否在这里就把pending去掉
        }
        // console.log(config,orgin)
    })
}





axios.interceptors.request.use(config => {
    removePending(config,'req'); //在一个axios发送前执行一下判定操作，在removePending中执行取消操作
    // console.log(config.url);
    let add = true;
    
     pending.forEach((value, index) => {
        if(axios.defaults.baseURL&&config.url)
            if ( value.url ===axios.defaults.baseURL + config.url) { //在当前请求在数组中存在时执行取消函数
                add = false;
            }
        })
    config.cancelToken = new cancelToken(function executor(c) {//本次axios请求的配置添加cancelToken
    if(add){
        pending.push({
            // url: config.url,
            url: axios.defaults.baseURL && config.url ? (axios.defaults.baseURL + config.url) : '',
            f: c
        });
        //将本次的url添加到pending中，因此对于某个url第一次发起的请求不会被取消，因为还没有配置取消函数
        }
    })
    
    return Promise.resolve(config);
}, error => {
    console.log(error);
    return Promise.reject(error)
})




axios.interceptors.response.use(res => {

    removePending(res.config,'res'); //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
    // console.log(res.config);//如果返回undefined说明被拦截了
 
    // if (res.data === 'Processing') {
    //     return {};
    // }
    return res
}, err => {
    if (err.response) {
        alert(err.response.data)
        return err.response.data
    } else if(!err.message) {
        // console.log(err)
        return { };
    } else{
        alert('网络错误，请稍后重试')
    }
})

export default axios;