const {resolve} = require('path');
const {HotModuleReplacementPlugin, NamedModulesPlugin} = require('webpack');

const BUILD_DIR = resolve(__dirname, 'dist');
const APP_DIR = resolve(__dirname, 'src');

let config = {
    context: APP_DIR,

    entry: [
        // activate HMR for React
        'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:8080',

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // the entry point of our app
        './index.jsx'
    ],
    output: {
        // the output bundle
        filename: 'bundle.js',

        path: BUILD_DIR,

        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/'
    },
    devtool: 'inline-source-map',

    devServer: {
        // enable HMR on the server
        hot: true,

        // match the output path
        contentBase: BUILD_DIR,

        // match the output `publicPath`
        publicPath: '/'
    },

    module: {
        rules: [
            {
                // Tell Webpack to use the babel-loader while bundling the files
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?modules', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader?modules', 'less-loader']
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ],
    },

    plugins: [
        // enable HMR globally
        new HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new NamedModulesPlugin(),
    ]

};

module.exports = config;