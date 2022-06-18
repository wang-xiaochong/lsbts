const CracoAlias = require('craco-alias');
const CracoLess = require('craco-less')
const path = require('path')
const px2rem = require('postcss-px2rem')

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
        },
        // {
        //     loader: require.resolve('postcss-loader'),
        //     options: {
        //          plugins: () => [
        //              //在postcss-loader的插件中加入这个插件
        //              //px2rem({ remUnit: 75 }) 的意思就是1rem = 75px 这个是根据750px设计稿来的，如果是620 的就写 62
        //              px2rem({ remUnit: 75 })
        //          ]
        //     }
        // }
    ],


}