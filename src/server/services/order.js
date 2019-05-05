const Joi = require('joi')
const format = require('../helpers/format')

const postcode = Joi.string()
  .regex(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/, { name: 'postcode'})
  .required()
  .error(() => 'Please supply a valid uk postcode')

const schema = Joi.object().keys({
  token: Joi.string().required().error(() => 'There is an issue with your card'), // this may need to be more specific
  number: Joi.string(),
  firstname: Joi.string().alphanum().required().error(() => 'Please enter your firstname'),
  lastname: Joi.string().alphanum().required().error(() => 'Please enter your lastname'),
  email: Joi.string().email().required().error(() => 'Please enter your email address so we can confirm your order'),
  phone: Joi.string()
    .regex(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/, { name: 'phoneNumber'})
    .required()
    .error(() => 'Please enter a number we can contact you on'),
  billingAddressLine1: Joi.string().required().error(() => 'Please enter a billing address'),
  billingAddressLine2: Joi.string().error(() => 'billing address should be legeable'),
  billingAddressLine3: Joi.string().error(() => 'billing address should be legeable'),
  billingCity: Joi.string().required().error(() => 'Please enter a billing city'),
  billingCounty: Joi.string().error(() => 'Please amend your billing county'),
  billingCountry: Joi.string().required().error(() => 'Please enter a billing country'),
  billingPostcode: postcode,
  shippingName: Joi.string().error(() => 'Name should be a legable'),
  shippingAddressLine1: Joi.string().required().error(() => 'Please enter a shipping address'),
  shippingAddressLine2: Joi.string().error(() => 'shipping address should be legeable'),
  shippingAddressLine3: Joi.string().error(() => 'shipping address should be legeable'),
  shippingCity: Joi.string().required().error(() => 'Please enter a shipping city'),
  shippingCounty: Joi.string().error(() => 'Please amend your shipping county'),
  shippingCountry: Joi.string().required().error(() => 'Please enter a billing country'),
  shippingPostcode: postcode,
  tandc: Joi.boolean().truthy('yes').error(() => 'please confirm you have read the terms and conditions'),
  instructions: Joi.string(),
  contactTime: Joi.string().error(() => 'Contact time should be a legable'),
  items: Joi.array().min(1).required(),
  subtotal: Joi.number().required(),
  total: Joi.number().required(),
  exceptions: Joi.string()
})

class Order {

  constructor (req) {
    this.details = (typeof req.body === 'string') ? JSON.parse(req.body) : req.body

    this.valid = false

    this.validation = null

    this.cmsResult = null

    this.messages = null

    this.process = this.process.bind(this)

    this.format = this.format.bind(this)
  }

  process (callback) {
    // get info and parse + validate
    this.validation = Joi.validate(this.details, schema)
    this.valid = (this.validation.error === null)
    if (!this.valid) {
      this.messages = this.validation.error.details
    }

    return callback(this.messages)
  }
  /**
   * Format
   * formats depending on whats required
   * @params {String} type = payment|api etc
   * @params {String} provider = stripe|strapi etc
   * @params {Object} extra = addional fields to add into format
   *
   * @returns {Object}
   */
  format (type, provider, extra) {
    return format(this.details, extra)[type][provider]()
  }
}

module.exports = Order
