const path = require('path');

module.exports = {
    target: 'web',
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            name: 'CursorNearbyElements',
            type: 'umd',
            umdNamedDefine: true,
        },

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-nullish-coalescing-operator']
                        }
                    }
                ]
            }
        ]
    },
}