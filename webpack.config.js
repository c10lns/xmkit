// const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
// const webpack = require('webpack'); //to access built-in plugins

const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 抽取CSS为独立文件

const path = require('path');

// console.log(process.env);
const DEBUG = process.env.npm_lifecycle_event === 'build';

const version = require('./package.json').version;

const config = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'xmkit.' + version + '.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // 匹配'js' or 'jsx' 后缀的文件类型
                exclude: /(node_modules|bower_components)/, // 排除某些文件
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        // new HtmlWebpackPlugin({ template: './src/index.html' })
        new ExtractTextPlugin('xmkit.' + version + '.css')
    ],
    devtool: DEBUG ? 'source-map' : ''
};
module.exports = config;