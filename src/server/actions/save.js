const async = require('async')
/**
 * services
 */
const Order = require('../services/order')
const api = require('../services/api')
/**
 * helpers
 */
const payload = require('../helpers/payload')

// if payment goes wrong and / or keeps going wrong and the user would just like to save the order

module.exports = (req, res) => {
  const { API_NETWORK } = process.env
  // 1. checks
  // check for API_NETWORK --> Could default to strapi
  if (!API_NETWORK) {
    res.status(500)
    return res.json(payload(new Error(`API_NETWORK env variable not set`)))
  }
  // 2. instantiate
  const order = new Order(req)

  return async.waterfall([
    // 3. validate
    order.process,
    // 4. create new order and items (may need to work this out)
    async.apply(api[API_NETWORK], order.format('apis', API_NETWORK, {
      paid: false
    }))
  ], (err, final) => {
    if (err) {
      res.status(500)
      return res.json(payload(err))
    }

    // 5. return order deets and format into object.
    res.status(200)
    res.json(final)
    // return deets and ok
  })
}
