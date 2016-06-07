//modules dependencies
var path = require('path');

// plugins dependencies
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    extensions: ['', '.js'], //extensions to add when resolving modules (that includes the entry). .js is needed for webpack-dev-server
    // directory names to be resolved to the current directory as well as its ancestors, and searched for modules.
    // similar to how node finds 'node_modules'
    modulesDirectories: ['node_modules'], //where to find the vendor modules
    root: [cfg.srcDir] //absolute path that contains our own modules
  },
  context: path.resolve(cfg.srcDir, 'styles'), //absolute path used to resolve the entry options, if the entry is a relative path
  entry: {
    style : './main-style.scss'
  },
  output: {
    path: cfg.buildDir,
    filename: 'js/bundle-[hash].js'
    // publicPath: "/" //inutile: par defaut le resultat de webpack (apres build en cas de modif) est servi depuis /
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")
    }, {
      test: /\.jpg$/,
      loader: "url-loader",
      query: {
        limit: '10000',
        mimetype: 'image/jpg',
        name: 'resources/[name]-[hash].[ext]'
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: cfg.root,
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin('css/[name]-[hash].css'),
    new HtmlWebpackPlugin({
      template: cfg.srcDir + '/index.html'
    }),
  ],
  /**DEV SERVER STUFF**/
  // TODO: auto refresh, rendre debug env dependant, lire la doc web pack dev server + error lors du lancement...
  debug: true,
  devtool: "sourcemap", //for css sourcemaps, we need this option and the sourceMap option for the cssLoader
  devServer: {
    "port": 9090,
    "contentBase": "build",
    "inline": true //necessaire pour rafraichir le client apres un rebuild
  }
};

module.exports = webpackConfig;
