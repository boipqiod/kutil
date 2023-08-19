const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // mode: "development",
    mode: "production",
    entry: {
        serviceWorker: './src/service-worker.ts',
        main: './src/main/index.ts',
        focusmanager: './src/focusmanager/index.ts',
    },
    output: {
        filename: (pathData) => {
            if (pathData.chunk.name === 'serviceWorker') {
                return 'service-worker.js';
            }
            return '[name]/index.js';
        },
        path: path.resolve(__dirname, 'app'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/main/index.html',
            filename: './main/index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/focusmanager/index.html',
            filename: './focusmanager/index.html',
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/**/*.json',
                    to: ({ context, absoluteFilename }) => {
                        const relativePath = path.relative(context, absoluteFilename);
                        return relativePath.replace(/^src\//, ''); // 'src/' 부분 제거
                    },
                },
            ],
        })
    ],
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({
    //             terserOptions: {
    //                 // 난독화 옵션
    //                 mangle: true, // 변수 이름을 짧고 의미 없는 것으로 변경
    //                 compress: {
    //                     drop_console: true, // 콘솔 로그 제거
    //                 },
    //             },
    //         }),
    //     ],
    // },

    devServer: {
        static: {
            directory: path.join(__dirname), // 정적 파일의 경로
        },
        port: 8000,
    },
};

