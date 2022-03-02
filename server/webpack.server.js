const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './src/server.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename:'server.js'
    },
    externals: [
      webpackNodeExternals()  
    ],
    target:'node',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use:['ts-loader']
            }
        ]
        
    }
}