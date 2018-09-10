# OVH Manager Webpack Toolkit

Extensible webpack configuration for the OVH Manager.

## Usage

The webpack configuration can be imported and extended in the manager.
To import the configuration, simply add ovh-manager-webpack-toolkit as a devDependency :

```bash
yarn add -D @ovh-ux/ovh-manager-webpack-toolkit
```

In order to use and extends this configuration, some manager relative parameters needs
to be provided. Please refer to the parameters and example below.

### Parameters

The following configuration parameters needs to be _provided_ :

 - _template_: path to manager main template file
 - _basePath_: the base path of the manager
 - _lessPath_: manager paths containing less files
 - _root_: root path of the manager
 - _assets.files_: see https://github.com/webpack-contrib/copy-webpack-plugin

The following configuration parameters are _optionals_ :
 - _assets.options_: see https://github.com/webpack-contrib/copy-webpack-plugin

### Example

```js
// import config and initialize parameters
const { config } = require('@ovh-ux/ovh-manager-webpack-toolkit')({
  template: path.resolve(__dirname, './client/index.html'),
  basePath: path.resolve(__dirname, './client'),
  lessPath: [
    path.resolve('./client/app'),
    path.resolve('./client/components'),
    path.resolve('./node_modules'),
  ],
  root: path.resolve(__dirname, './client/app'),
  assets: {
    files: [
      { from: path.resolve(__dirname, './client/app/common/assets'), to: 'assets' },
    ],
  },
});

// merge config and export webpack configuration
module.exports = merge(config, {
  entry: _.assign({
    main: path.resolve(__dirname, './client/app/index.js'), // main entry point
  }, {
    config: [
      // merge dev or prod config depending on webpack serve environment
      path.resolve(__dirname, `client/app/config/${process.env.WEBPACK_SERVE ? 'dev' : 'prod'}.js`)
    ],
  }),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
});
```
