const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const cors = require('cors')

const global = require('./config/options')
const seeder = require('./config/seeder')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './client', dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 80

const corsOptions = {
  origin: ['http://example.com', 'http://api.example.com'],
  optionsSuccessStatus: 200
}

mongoose
  .plugin(require('mongoose-find-or-create'))
  .set('debug', dev)
  .connect(global.MONGO_URL)
  .then(() => {
    seeder(() => {
      app.prepare()
        .then(() => {
          const server = express()
          server.use(cors(corsOptions))
          server.use(require("body-parser").text())

          require('./routes')(server, app)

          server.get('*', (req, res) => {
            return handle(req, res)
          })

          server.listen(port, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:' + port)
            require('./utils/watch')
          })
        })
        .catch((ex) => {
          console.error(ex.stack)
          process.exit(1)
      })
    })
  })
