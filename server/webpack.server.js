const path = require('path')

module.exports = {
    entry: './src/server.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename:'server.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use:['ts-loader']
            }
        ]
        
    }
}