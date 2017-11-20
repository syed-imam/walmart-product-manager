module.exports = {
    entry: './client/app.js',
    output: {
        path: './client',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: [/\.jsx?$/],
                loader: 'babel-loader',
                exclude: /(node_modules)/,
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
