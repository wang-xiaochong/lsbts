const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        // target: 'http://localhost:7070/',
        target: 'http://82.156.109.119:7070/',
        changeOrigin: true,
        ws:false,
    }))
}