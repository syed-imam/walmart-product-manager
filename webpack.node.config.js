var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports =
    {  // The configuration for the server-side rendering
        name: 'server',
        target: 'node',
        entry: './index.js',
        output: {
            path: path.join(__dirname,  '/client'),
            filename: 'bundle.js'
        },
        externals: nodeModules,
        module: {
            loaders: [
                { test: /\.js$/,

                    loaders: [
                        // 'imports?document=this',

                        // 'react-hot',
                        'babel-loader'
                        //,'jsx-loader'
                    ]
                },
                { test:  /\.json$/, loader: 'json-loader' },
            ]
        },
    };