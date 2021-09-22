const path = require('path');

module.exports = {
    target: 'web',
    mode: 'production',
    entry: { index: './src/index.js' },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        library: "prod-logger",
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    }
};
