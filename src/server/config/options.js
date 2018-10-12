const path = require('path')

const dbName = 'database'

module.exports = {
  debug: true,
  port: 80,
  dbName: dbName,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://' +
    process.env.MONGO_PORT_27017_TCP_ADDR +
    ':' + process.env.MONGO_PORT_27017_TCP_PORT +
    '/' + dbName,
  folders: {
    models: path.join(__dirname, '/../models/')
  }
}
