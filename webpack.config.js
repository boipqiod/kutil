const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

//현재 페이지 리스트
const pageList = ["main", "focusmanager"]


module.exports = {
    mode: "development",
    entry: getConfigByList(pageList).entry, // 엔트리 포인트
    output: {
        filename: '[name]/bundle.js', // 결과물 파일
        path: path.resolve(__dirname), // 결과물 디렉토리
    },
    resolve: {
        extensions: ['.ts', '.js'], // .ts 확장자를 인식하도록 설정
    },
    module: {
        rules: [
            {
                test: /\.css$/, // CSS 파일을 대상으로 함
                use: ['style-loader', 'css-loader'], // 적용할 로더
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    plugins: getConfigByList(pageList).plugins,
    devServer: {
        static: path.join(__dirname), // 서버의 루트 경로
        compress: true, // gzip 압축 활성화
        port: 8000 // 포트 번호
    }
};


/**
 *
 * @param {string} name
 * @returns {HtmlWebpackPlugin}
 */
function getHtmlWebpackPlugin(name) {
    return new HtmlWebpackPlugin({
        filename: `${name}/index.html`,
        template: `./src/${name}/index.html`,
        chunks: [name],
    })
}

/**
 * @param {string[]} pageList
 */
function getConfigByList(pageList) {
    const entry = {}
    const plugins = []

    pageList.forEach(page => {
        entry[page] = `./src/${page}/index.ts`
        plugins.push(getHtmlWebpackPlugin(page))
    })

    return {entry, plugins}
}