const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

const allowlistExternals = ['webpack/hot/poll?100', 'shared', 'renderer'];

module.exports = function (options, webpack) {
  // options.output = {
  //   ...options.output,
  //   libraryTarget: 'umd',
  // };

  options.externals = [
    nodeExternals({
      allowlist: allowlistExternals,
    }),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      allowlist: allowlistExternals,
    }),
  ];

  if (!process.env.PRODUCTION) {
    options.watchOptions = {
      ...options.watchOptions,
      poll: true,
    };

    options.entry = ['webpack/hot/poll?100', options.entry];

    options.plugins = [
      ...options.plugins,

      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
    ];
  }

  return options;
};
