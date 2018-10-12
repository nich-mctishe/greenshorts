/**
 * actions
 */
const base = require('../actions/base')

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
}
