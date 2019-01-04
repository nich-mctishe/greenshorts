const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env
const path = require('path')

module.exports = withSass(withCss({
  webpack: function (config, { isServer }) {

    return config
  }
}))
