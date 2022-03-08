const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use( createProxyMiddleware('/oauth2.0',{
        target: 'https://graph.qq.com/',
        changeOrigin: true,
        // target: 'http://localhost:7001/',
        // pathRewrite: {
        //     '^/oauth2.0': '',
        //     changeOrigin: true,
        //     secure: false, // 是否验证证书
        //     ws: true, // 启用websocket
        // },
    }))
    app.use( createProxyMiddleware('/user',{
        target: 'https://graph.qq.com/',
        changeOrigin: true,
    }))
}

