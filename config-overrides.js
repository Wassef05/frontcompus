const { overrideDevServer } = require('customize-cra');

const devServerConfig = () => (config) => {
  config.allowedHosts = ['all'];
  return config;
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
};
