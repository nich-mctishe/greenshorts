const Stripe = require('stripe')

module.exports = async (order, callback) => {
  if (!process.env.STRIPE_KEY) {
    return callback(new Error('STRIPE_KEY env var not set'))
  }

  try {
    const stripe = Stripe(process.env.STRIPE_KEY)

    let {status} = await stripe.charges.create(order)

    // check here if status contains error?

    if (status.error) {
      return callback(new Error(status.error))
    }

    // could just return token here
    return callback(null, status)
  } catch (error) {
    return callback(new Error(error))
  }
}
