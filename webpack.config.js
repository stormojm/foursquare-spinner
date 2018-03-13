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
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
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
