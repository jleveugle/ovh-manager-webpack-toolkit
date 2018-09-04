const merge = require('webpack-merge');

module.exports = (opts) => {
    const commonConfig = require('./webpack.common')(opts);
    const devConfig = require('./webpack.dev');
    const prodConfig = require('./webpack.prod');
    const config = merge(commonConfig, process.env.WEBPACK_SERVE ? devConfig : prodConfig);

    return { commonConfig, devConfig, prodConfig, config };
};