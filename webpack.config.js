var path = require('path');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
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
        rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env']
                }
            }
        }
      ]
    }
};
