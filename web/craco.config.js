const CracoAlias = require('craco-alias');
const CracoLess = require('craco-less')
const path = require('path')
module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                aliases: {
                    'models': path.resolve(__dirname, './src/models'),
                    '@': path.resolve(__dirname, './src')

                }
            }
        },
        {
            plugin: CracoLess,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },//配置antd主题色
                        javascriptEnabled: true,
                        sourceMap: false,
                    },
                },
            },
        }
    ],

}