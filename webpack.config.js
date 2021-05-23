const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {

    mode: "development",

    entry: './app/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },

    devServer: {
        port:8081,
        contentBase: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],
    
    
}

