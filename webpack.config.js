var webpack = require('webpack'),
       path = require('path');

module.exports = {
    context: __dirname + '/app',
    entry: {
        app: './app.js',
        vendor: ['angular']  
    },
    output: {
        path: __dirname + '/public/scripts',
        filename: 'todo.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({/* chunkName= */name: "vendor", /* filename= */ filename: "vendor.bundle.js"})
    ]
};

//this file uses webpack to bundle up all of the js files into two scripts. the output script and the plugin script.