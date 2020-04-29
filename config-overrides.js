module.exports = function override(config, env) {
  const newConfig = Object.create(config);
  newConfig.resolve = {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.png', '.svg'],
    alias: {
      '@': `${__dirname}/src/`,
      utility: `${__dirname}/src/utility/`,
      assets: `${__dirname}/src/assets/`,
      components: `${__dirname}/src/components/`,
      containers: `${__dirname}/src/containers/`
    }
  };
  return newConfig;
};
