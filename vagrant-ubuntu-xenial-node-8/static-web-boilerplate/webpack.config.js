module.exports = {
    entry: './src/js/index.js',
    output: {
        path: _dirname,
        filename: './bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]

}