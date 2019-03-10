/**
 * This is your seeder update template. to use this simply:
 * duplicate this file and place in updates folder
 * rename the file some-update-name-YYYY-MM-DD.js
 * create yml or csv or json to store any required data and place it in data
 * rename the data file to the same as the seeder file with the appropriate file extension
 * in the export function create what ever it is you need to update.
 * you can require any modules you need.
 */

// const _ = require('lodash')
const async = require('async')

const meta = {
  name: 'test-1970-01-01',
  author: 'Nich Headlong',
  description: 'This file will upload the test seeds to the database.'
}

module.exports = (data, models, helper, next) => {
  // for xml
  // data = helper.format.toStandardType(data)

  helper.logging.init(meta)
  let parents = []
  // run required tasks here. for example:
  async.eachSeries(data, (line, callback) => {
    if (helper.line.hasParent(line.data)) {
      parents.push(line)

      return callback()
    }
    // if model has a parent, put in parents, then move to next
    helper.model.insert(
      models[line.model],
      {slug: line.data.slug},
      line.data,
      callback
    )
  }, (err) => {
    if (err) return next(err)

    if (!parents.length) {
      return next()
    }

    // otherwise run through parents
    async.eachSeries(parents, (line, callback) => {
      let parent = helper.model.find.parent(line.data).data
      let parentIndex = helper.model.find.parentIndex(line.data)

      helper.model.insertParent(
        models[parentIndex],
        models[line.model],
        parent,
        {slug: line.data.slug},
        parentIndex,
        line.data,
        callback
      )
    }, (err) => {
      if (err) {
        return next(err)
      }

      return next()
    })
  })
}
