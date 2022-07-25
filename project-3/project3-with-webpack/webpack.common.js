module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(svg|png|jpg|gif)$/i,
                loader: "file-loader",
                options: {
                    name:"[name].[hash:4].[ext]",
                    outputPath: 'images',
                    publicPath: 'images',
                },
            }
        ]
    }
}