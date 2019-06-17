/**
 * This is where calls to headless CMS and/or seperate API services take place
 * Strapi is implemented by default to lead to an Order object
 *
 * If you want to use another service add it to the module.exports object here
 * make sure you set the API_SERVICE env var from strapi to whatever your desired
 * service might be.
 */
 const Strapi = require('./strapi')

module.exports = {
  strapi: Strapi
}
