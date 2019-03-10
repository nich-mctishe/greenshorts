const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const extract = new ExtractTextPlugin({ filename: 'static/[contenthash].css' })
const { ANALYZE } = process.env
const path = require('path')

// const commonsChunkConfig = (config, test = /\.css$/) => {
//     config.plugins = config.plugins.map(plugin => {
//         if (
//             plugin.constructor.name === 'CommonsChunkPlugin' &&
//             // disable filenameTemplate checks here because they never match
//             // (plugin.filenameTemplate === 'commons.js' ||
//             //     plugin.filenameTemplate === 'main.js')
//             // do check for minChunks though, because this has to (should?) exist
//             plugin.minChunks != null
//         ) {
//             const defaultMinChunks = plugin.minChunks;
//             plugin.minChunks = (module, count) => {
//                 if (module.resource && module.resource.match(test)) {
//                     return true;
//                 }
//                 return defaultMinChunks(module, count);
//             };
//         }
//         return plugin;
//     });
//     return config;
// }

// module.exports = withSass(withCss({
//
//   // webpack (config, options) {
//   //   return config
//   // }
//   // webpack: function (config, { isServer }) {
//   //
//   //   return config
//   // }
// }))

module.exports = withSass(withCss({
  webpack: function (config, { isServer }) {

    return config
  }
}))

// module.exports = withSass({
//   extractCSSPlugin: extract,
//   webpack: config => {
//       config.plugins.push(extract);
//       return config;
//   }
// })


// module.exports = withSass(withCss({
//   webpack: config => commonsChunkConfig(config, /\.(sass|scss|css)$/)
// }));

// module.exports = withSass(withCss())

// module.exports = withSass()

// module.exports = withSass({
//     cssModules: true,
//     webpack: config => {
//         config = commonsChunkConfig(config, /\.(sass|scss|css)$/);
//         return config;
//     }
// });
