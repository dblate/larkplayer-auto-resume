var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'larkplayer-auto-resume',
        libraryTarget: 'umd'
    },
    externals: {
        larkplayer: {
            commonjs: 'larkplayer',
            commonjs2: 'larkplayer',
            amd: 'larkplayer',
            root: 'larkplayer'
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}