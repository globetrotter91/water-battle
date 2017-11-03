var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './client/game/start.js'
    }, 
    output:{
        filename: './client/js/game-ui.js', 
        sourceMapFilename: './client/js/bundle.map'
    }, 
    devtool: '#source-map', 
    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/, 
                loader: 'babel-loader', 
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}