const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {InjectManifest} = require("workbox-webpack-plugin");

// 현재 페이지 리스트
const pageList = ["main", "focusmanager"];

module.exports = {
    // mode: "development",
    mode: "production",
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
                use: ['style-loader', 'css-loader'],
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
        // new InjectManifest({
        //     swSrc: './src/serviceWorker.ts',
        //     swDest: 'serviceWorker.js',
        //     exclude: [/\.map$/, /manifest\.json$/],
        // }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'public', to: 'kutil/public'}
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    // 난독화 옵션
                    mangle: true, // 변수 이름을 짧고 의미 없는 것으로 변경
                    compress: {
                        // drop_console: true, // 콘솔 로그 제거
                    },
                },
            }),
        ],
    },

    devServer: {
        static: {
            directory: path.join(__dirname), // 정적 파일의 경로
        },
        port: 8000,
        compress: true,
        hot: true,
    }
};


function getHtmlWebpackPlugin(name) {
    return new HtmlWebpackPlugin({
        filename: `${name}/index.html`,
        template: `./src/${name}/index.html`,
        chunks: [name],
        templateParameters: {
            PUBLIC: '/kutil' // publicPath 값을 전달
        }
    })
}

function getConfigByList(pageList) {
    const entry = {};
    const plugins = [];

    pageList.forEach(page => {
        entry[page] = `./src/${page}/index.ts`;
        plugins.push(getHtmlWebpackPlugin(page));
    });

    return {entry, plugins};
}


