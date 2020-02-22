
module.exports = {
  plugins: ['typescript'],
  modify(defaultConfig, { target, dev }) {
    const config = defaultConfig
    config.optimization = { ...config.optimization }
    if (!dev) {
      config.optimization = Object.assign(config.optimization, {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              priority: -10
            }
          } 
        }
      })
    }
    return config
  }
}
