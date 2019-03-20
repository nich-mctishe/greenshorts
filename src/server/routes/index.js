/**
 * actions
 */
const base = require('../actions/base')
/**
 * services
 */
const Order = require('../services/order')

module.exports = (server, app) => {
  /**
   * Put your API routes here.
   */
  server.get('/api/hello', base)

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.post('/charge', async (req, res) => {
    let order = new Order(req, res)
    const stripe = require("stripe")("sk_test_y60j9PyE9kzQKV2uVL8g05Yh")

    order.process()

    if (order.valid) {
      try {
        // this will need to be modified
        let {status} = await stripe.charges.create({
          amount: 2000,
          currency: "gbp",
          description: "An example charge",
          source: req.body
        })

        // send requires to headless cms
        order.post()

        res.json({status})
      } catch (err) {
        // turn these into proper errors --> could use async for all this
        res.status(500).end()
      }
    } else {
      res.json({
        error: true,
        messages: order.validation.messages
      })
    }
  })
}
