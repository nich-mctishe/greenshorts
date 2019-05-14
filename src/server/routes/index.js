/**
 * actions
 */
const base = require('../actions/base')
const charge = require('../actions/charge')
const save = require('../actions/save')
const retrieve = require('../actions/retrieve')

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

  server.get('/products/:id', (req, res) => {
    const actualPage = '/product'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.post('/charge', charge)

  server.post('/save', save)

  server.get('/order/:id', retrieve)
}
