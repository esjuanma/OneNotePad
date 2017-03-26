var path = require('path');
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("../configs/webpack.config.devserver");

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    lazy: true,
    publicPath: "/",
	contentBase: path.join(__dirname, "../../src"),
	proxy: {
		"/js": {
			pathRewrite: {
				"^/js": ""
			}
		}
	}
}));

app.listen(3000, function() {
    console.log("Listening on port 3000!");
});
