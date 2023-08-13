const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 현재 페이지 리스트
const pageList = ["main", "focusmanager"];

module.exports = {
    mode: "development",
    entry: getConfigByList(pageList).entry,
    output: {
        publicPath: '/kutil/',
        filename: '[name]/bundle.js',
        path: path.resolve(__dirname),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        ...getConfigByList(pageList).plugins,
        new MiniCssExtractPlugin({
            filename: '[name]/styles.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public', to: 'kutil/public' } // 경로를 'kutil/public'로 수정
            ],
        }),
    ],
    devServer: {
        static: path.join(__dirname),
        compress: true,
        port: 8000
    }
};

function getHtmlWebpackPlugin(name) {
    return new HtmlWebpackPlugin({
        filename: `${name}/index.html`,
        template: `./src/${name}/index.html`,
        chunks: [name],
        templateParameters:{
            PUBLIC: '/kutil' // publicPath 값을 전달

        }
    })
}

function getConfigByList(pageList) {
    const entry = {};
    const plugins = [];

    pageList.forEach(page => {
        entry[page] = `./src/${page}/index.ts`;
        plugins.push(getHtmlWebpackPlugin(page)); // 수정된 함수 호출
    });

    return { entry, plugins };
}
