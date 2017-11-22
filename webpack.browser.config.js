var path = require('path');
const webpack=require('webpack');

module.exports = {
    entry: './client/app.js',
    output: {
        path:  path.join(__dirname,  '/client'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {   test: /\.css$/,
                loader:'style!css!'
            },
            {
                test: [/\.jsx?$/],
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015','env', 'stage-2']
                },
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx','.css']
    },
};
