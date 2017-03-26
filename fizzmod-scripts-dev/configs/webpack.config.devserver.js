var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var paths = require('./paths.js');

module.exports = {
    /**************************/
    /* ADD CUSTOM CONFIG HERE */
    entry: paths,
    output: {
        publicPath: "/files",
        filename: '[name].js',
        path: path.resolve(__dirname, "/build")
    },
    /**************************/
    /* DO NOT EDIT THIS OR YOU WILL GET FIRED */
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "lodash": "lodash",
        "vtexjs": "vtexjs",
        "Fizzmod": "Fizzmod"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [
                    require.resolve('babel-preset-es2015'),
                    require.resolve('babel-preset-react')
                ],
                plugins: [
                    require.resolve('babel-plugin-transform-runtime'),
                    require.resolve('babel-plugin-transform-es2015-modules-amd')
                ]
            }
        }, {
            test: /\.json$/,
            loader: "json-loader"
        }, {
			test: /\.(scss|sass)$/,
			loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
		}, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&-autoprefixer!postcss')
        }, {
            test: /\.svg$/,
            loader: 'file',
			query: {
				publicPath: "/",
				name: "arquivos/[name].[ext]"
			}
        }]
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.json', ".css"],
        root: [
            path.resolve(__dirname, "../node_modules")
        ]
    },
    resolveLoader: {
        root: path.join(__dirname, '../node_modules'),
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                ]
            }),
        ];
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ],
    jshint: {
        esversion: 6
    }
}
