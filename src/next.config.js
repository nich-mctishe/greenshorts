const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env
const path = require('path')

module.exports = withSass(withCss({
  webpack: function (config, { isServer }) {

    return config
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_BASE_URL,
    STRIPE_KEY: process.env.STRIPE_KEY_PUBLIC
  }
}))
