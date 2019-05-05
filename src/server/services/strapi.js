const axios = require('axios')
const _ = require('lodash')

const call = async payload => {
  const { status, data } = await axios(payload)

  return { status, data }
}

const formatItems = items => items.map(
  item => `${item.quantity} x ${item.product.name}${item.product.sku ? ' (' + item.product.sku + ') ' : ' '}- ${item.size} = ${item['total-cost']}`)
  .join(',\n')

const authenticate = async () => {
  const auth = await call({
    method: 'post',
    url: `${process.env.API_BASE_URL}/auth/local`,
    data: {
      identifier: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    }
  })

  if (auth.status !== 200) {
    throw new Error(auth.data.message)
  }

  return auth.data
}

const getOriginalOrder = async (order, jwt) => {
  if (order.number) {
    // check to see if order exists
    original = await call({
      method: 'get',
      url: `${process.env.API_BASE_URL}/orders?number=${order.number}`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    if (original.status !== 200) {
      console.error('Strapi API Handler: problem retreiving old order -- falling back to making a new one');
      console.error('ERROR: ', original.data.message);
    }

    return (original.status !== 200) ? null : original.data
  }
}

const makeNewOrder = async (original, order, jwt) => {
  console.log('original', original);
  console.log('order', order);
  console.log('jwt', jwt);

  const newOrder = await call({
    method: original ? 'put' : 'post',
    url: `${process.env.API_BASE_URL}/orders/${_.get(original, '[0]_id') || ''}`,
    data: order,
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  console.log('newOrder', newOrder);

  if (newOrder.status !== 200) {
    throw new Error(newOrder.data.message)
  }

  return newOrder.data
}

module.exports = async (order, callback) => {
  // check all base vals are present
  const { API_BASE_URL, API_USERNAME, API_PASSWORD } = process.env
  if (!API_BASE_URL || !API_USERNAME || !API_PASSWORD) {
    const env = API_BASE_URL
      ? (API_USERNAME ? 'API_PASSWORD' : 'API_USERNAME')
      : 'API_BASE_URL'
    return callback(new Error(`${env} env var not set`))
  }

  order.items = formatItems(order.items)

  console.log(order);

  try {
    // get log in jwt
    const auth = await authenticate()
    // get old order if there is one
    const original = await getOriginalOrder(order, auth.jwt)
    // create new order.
    const newOrder = await makeNewOrder(original, order, auth.jwt)

    return callback(null, newOrder)
  } catch (e) {
    console.error('e:', e)
    return callback(e)
  }
}
