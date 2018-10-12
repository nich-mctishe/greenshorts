/**
 * This is your seeder update template. to use this simply:
 * duplicate this file and place in updates folder
 * rename the file some-update-name-YYYY-MM-DD.js
 * create yml or csv or json to store any required data and place it in data
 * rename the data file to the same as the seeder file with the appropriate file extension
 * in the export function create what ever it is you need to update.
 * you can require any modules you need.
 */

const _ = require('lodash')
const async = require('async')

const meta = {
  name: '{{name}}',
  author: '{{author}}',
  description: '{{description}}'
}

module.exports = (data, models, helper, next) => {
  helper.logging.init(meta)

  // run required tasks here. for example:

  async.eachSeries(data, (data, callback) => {
    let key = _.findKey(data)
    Set[key](key, models[key], data, callback)
  }, (err) => {
    if (err) return next(err)

    next()
  })
}
