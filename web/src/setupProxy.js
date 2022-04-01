const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        // target: 'http://localhost:7070/',
        target: 'https://localhost:7070/',
        changeOrigin: true,
        ws:false,
    }))
    app.use( '/oauth2.0/me',createProxyMiddleware({
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
}