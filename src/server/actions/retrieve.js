const axios = require('axios')
const async = require('async')
const payload = require('../helpers/payload')

const routes = {
  strapi: {
    auth: '/auth/local',
    order: '/orders/'
  }
}

const auth = (route, callback) => {
  const { API_USERNAME, API_PASSWORD, API_BASE_URL } = process.env

  if (!API_USERNAME || !API_PASSWORD) {
    return callback(new Error(`${!API_USERNAME ? 'API_USERNAME' : 'API_PASSWORD'} env variable not set`))
  }

  return axios.post(`${API_BASE_URL}${route.auth}`, {
    identifier: API_USERNAME,
    password: API_PASSWORD
  })
    .then(auth => callback(null, route, auth.data.jwt))
    .catch(err => callback(err))
}

const order = (orderId, orderNumber, route, jwt, callback) => {
  return axios.get(`${process.env.API_BASE_URL}${route.order}${orderId}?number=${order}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
    .then(ord => callback(null, ord))
    .catch(err => callback(err))
}

module.exports = (req, res) => {
  const { API_BASE_URL, API_NETWORK } = process.env

  if (!API_BASE_URL || !API_NETWORK) {
    return res.json(payload(new Error(`${!API_BASE_URL ? 'API_BASE_URL' : 'API_NETWORK'} env variable not set`)))
  }

  if (!req.params || !req.params.id || !req.query.number) {
    return res.json(payload('missing order information'))
  }

  // TODO: Check input format
  async.waterfall([
    // auth
    async.apply(auth, routes[API_NETWORK]),
    // order
    async.apply(order, req.params.id, req.query.number)
  ], (err, order) => {
    console.log(err);

    if (err) {
      res.status(500)
      return res.json(payload(err))
    }

    res.status(200)
    return res.json(payload(null, order.data))
  })
}
