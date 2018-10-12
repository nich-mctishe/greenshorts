const fs = require('fs')
const async = require('async')
const global = require('../config/options')

module.exports = {
  // get list of required models
  get: (mongoose, callback) => {
    let models = {}
    fs.readdir(global.folders.models, (err, files) => {
      if (err) return callback(err)

      async.eachSeries(files, (file, next) => {
        if (file !== '.DS_Store' && file !== '.gitkeep') {
          let name = file.replace('.js', '')
          models[name] = require('../models/' + name)
        }

        next()
      }, (err) => {
        if (err) return callback(err)

        return callback(null, models)
      })
    })
  }
}
