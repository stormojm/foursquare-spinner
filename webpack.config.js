module.exports = {
    entry: './src/app.js',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.svg$/,
                use: 'file-loader'
            }
        ]
    }
};
