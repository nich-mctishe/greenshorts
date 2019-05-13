const async = require('async')
/**
 * services
 */
const Order = require('../services/order')
const payment = require('../services/payment')
const api = require('../services/api')

/**
 * helpers
 */
 const payload = require('../helpers/payload')

module.exports = (req, res) => {
  const { API_NETWORK, PAYMENT_NETWORK } = process.env
  // 1. checks
  // check for API_NETWORK --> Could default to strapi
  // check for PAYMENT_NETWORK --> could default to strapi
  if (!API_NETWORK || !PAYMENT_NETWORK) {
    res.status(500)
    return res.json(payload(
      new Error(
        `${API_NETWORK ? 'API_NETWORK' : 'PAYMENT_NETWORK'} env variable not set`
        )
      ))
  }
  // 2. instantiate
  const order = new Order(req)

  return async.waterfall([
    // 3. validate
    order.process,
    // 2. format for stripe
    // 3. create stripe charge
    // 4. return stripe info
    async.apply(
      payment[PAYMENT_NETWORK],
      order.format('payment', PAYMENT_NETWORK)
    ),
    // 5. format for strapi
    (data, callback) => {
      console.log('data', data);
      console.log('callback', callback);

      console.log(api[API_NETWORK]);

      // 6. create new order and items (may need to work this out)
      api[API_NETWORK](order.format('apis', API_NETWORK, {
        token: data.token,
        paid: true
      }), callback)
    }
  ], (err, final) => {
    if (err) {
      res.status(500)
      return res.json(payload(err))
    }

    // 7. return order deets and format into object.
    res.status(200)
    res.json(final)
    // return deets and ok
  })
}
