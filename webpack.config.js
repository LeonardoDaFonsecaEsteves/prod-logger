const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        lib: './src/index.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        symlinks: false,
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'src')],
                use: [
                    {
                        loader: 'cache-loader',
                        options: {},
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                        },
                    },
                ],
            },
        ],
    },
    output: {
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    externals: [{
        "toolkit-json": "toolkit-json"
    }],
}
