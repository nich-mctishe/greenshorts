// this file can be set up to run the seeder and await for the end.
// this will then fire as a .then
const seeder = require('node-seeder')
const path = require('path')
const location = path.join(__dirname, '/../../seeder/updates/')
const models = require('../helpers/models')

const getModels = (callback) => {
  return models.get(true, callback)
}

module.exports = next => {
  getModels((err, models) => {
    if (err) {
      return console.error(err)
    }

    seeder.run(location, models, next)
  })
}
