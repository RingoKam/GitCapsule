let path = require('path'),
    webpack = require('webpack')

module.exports = {
    //context is base directory(aka absolute path) for resolving entry
    context: path.resolve('src'),
    //entry point, files that has all hook 
    entry: ['./app/app-module'],
    //bundle file output location
    output: {
        path: path.resolve('build/js/'),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: 'public'
    },
    watch: true,
    module: {
        loaders: [{
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.(png|jpg|ttf|eot)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000'
            },{
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader"
            }, {
                test: /\.scss$/,
                 loader: "style-loader!css-loader!sass-loader"
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "raw-loader"
            },  {
                test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
                loader: 'file?name=fonts/[name].[ext]'
            }, {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: "json-loader"
            }
        ]
    },
    target: 'electron',
    resolve: {
        //array of file extensions that will be included to be process in module
        extensions: ['', '.js', '.es6', '.json']
    }
}