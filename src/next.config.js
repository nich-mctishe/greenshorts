const withSass = require('@zeit/next-sass')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env
const path = require('path')

module.exports = withSass({
  webpack: function (config, { isServer }) {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerHost: '0.0.0.0',
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }))
    }
    config.resolve.alias.components = path.resolve(__dirname, 'client/components')
    config.resolve.alias.lib = path.resolve(__dirname, 'client/lib')
    config.resolve.alias.pages = path.resolve(__dirname, 'client/pages')
    config.resolve.alias.css = path.resolve(__dirname, 'client/assets/css')
    return config
  },
  exportPathMap: function (defaultPathMap) {
    return {
      '/': { page: '/' }
    }
  }
})
