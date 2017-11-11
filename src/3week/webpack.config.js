const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                ExtractPlugin.extract(
                    {
                        fallback : "style-loader",
                        use : "css-loader"
                    }
                )

            ]
        },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)/,
                use: [
                    'file-loader'
                ]
            },
            {
                test:/\.js/,
                exclude: /(node_modules|bower_component)/,
                use : {
                    loader: 'babel-loader',
                    options: {
                        presets:['env']
                    }
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            title : 'baseball game',
            template : 'index.html'
        }),
        new ExtractPlugin('style.css')

    ]
};