# OVH Manager Webpack Toolkit

Extensible webpack configuration for the OVH Manager.

## Usage

The webpack configuration can be imported and extended in the manager.
To import the configuration, simply add ovh-manager-webpack-toolkit as a devDependency :

```bash
yarn add -D @ovh-ux/ovh-manager-webpack-toolkit
```

In order to use and extends this configuration, some manager dependent parameters needs
to be provided. Please refer to the informations and example below.

The following configuration parameters needs to be provided :

 - template: path to manager main template file
 - basePath: the base path of the manager
 - lessPath: manager paths containing less files
 - root: root path of the manager
 - assets.files: see https://github.com/webpack-contrib/copy-webpack-plugin

The following configuration parameters are optionals :
 - assets.options: see https://github.com/webpack-contrib/copy-webpack-plugin

## Example

```js
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


module.exports = merge(config, {
  entry: _.assign({
    main: path.resolve(__dirname, './client/app/index.js'),
  }, {
    config: [path.resolve(__dirname, `client/app/config/${process.env.WEBPACK_SERVE ? 'dev' : 'prod'}.js`)],
  }),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
});
```
