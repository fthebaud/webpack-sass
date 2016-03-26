//modules dependencies
var path = require('path');

// plugins dependencies
var CleanWebpackPlugin = require('clean-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// configuration object
var cfg = {
  root: path.resolve(__dirname)
};
cfg.srcDir = path.resolve(cfg.root, 'src');
cfg.buildDir = path.resolve(cfg.root, 'build');

//webpack configuration
var webpackConfig = {
  target: 'web',
  cache: true,
  resolve: {
    extensions: [''], //extensions to add when resolving modules (that includes the entry)
    //directory names to be resolved to the current directory as well as its ancestors, and searched for modules. similar to how node finds ?node_modules?
    modulesDirectories: ['node_modules'], //where to find the vendor modules
    root: [cfg.srcDir] //absolute path that contains our own modules
  },
  context: path.resolve(cfg.srcDir, 'styles'), //absolute path used to resolve the entry options, if the entry is a relative path
  entry: {
    style : './main-style.scss'
  },
  output: {
    path: cfg.buildDir,
    filename: 'css/[name]-compiled-[hash].js'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: "style-loader!css-loader!sass-loader"
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: cfg.root,
      verbose: true,
      dry: false
    }),
    //new ExtractTextPlugin('resources/[name]-bundle-[hash].css'),
    new HtmlWebpackPlugin({
      template: cfg.srcDir + '/index.html'
    }),
  ]
};

module.exports = webpackConfig;
