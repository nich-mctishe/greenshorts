const Joi = require('joi')

const postcode = Joi.string()
  .regex(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/, { name: 'postcode'})
  .required()
  .error(() => 'Please supply a valid uk postcode')

const schema = {
  firstname: Joi.string().alphanum().required().error(() => 'Please enter your firstname'),
  lastname: Joi.string().alphanum().required().error(() => 'Please enter your lastname'),
  email: Joi.string().email().required().error(() => 'Please enter your email address so we can confirm your order'),
  phone: Joi.string()
    .regex(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/, { name: 'phoneNumber'})
    .required()
    .error(() => 'Please enter a number we can contact you on'),
  billingAddressLine1: Joi.string().required().error(() => 'Please enter a billing address'),
  billingAddressLine2: Joi.string().error(() => 'billing address should be legeable'),
  billingAddressLine3: Joi.string() .error(() => 'billing address should be legeable'),
  billingCity: Joi.string().alphanum().required().error(() => 'Please enter a billing city'),
  billingPostcode: postcode,
  shippingName: Joi.string().error(() => 'Name should be a legable'),
  shippingAddressLine1: Joi.string().required().error(() => 'Please enter a shipping address'),
  shippingAddressLine2: Joi.string().error(() => 'shipping address should be legeable'),
  shippingAddressLine3: Joi.string().error(() => 'shipping address should be legeable'),
  shippingCity: Joi.string().alphanum().required().error(() => 'Please enter a shipping city'),
  shippingPostcode: postcode,
  tandc: Joi.boolean().truthy('yes').error(() => 'please confirm you have read the terms and conditions'),
  contactTime: Joi.string().error(() => 'Contact time should be a legable'),
  items: Joi.array().min(1),
  value: Joii.number().required()
}

const format(data, extra) => {
  return {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    billingAddressLine1: data.billingAddressLine1,
    billingAddressLine2: data.billingAddressLine2,
    billingAddressLine3: data.billingAddressLine3,
    billingCity: data.billingCity,
    billingPostcode: data.billingPostcode,
    shippingName: data.shippingName || `${data.firstname} ${data.lastname}`,
    shippingAddressLine1: data.shippingAddressLine1,
    shippingAddressLine2: data.shippingAddressLine2,
    shippingAddressLine3: data.shippingAddressLine3,
    shippingCity: data.shippingCity,
    shippingPostcode: data.shippingPostcode,
    tandc: data.tandc,
    contactTime: data.contactTime,
    items: data.items, // this may need to be formatted for insertion
    paid: extra.paid || false,
    value: data.value
  }
}

class Order {

  details = {}

  formatted = {}

  valid = false

  validation = null

  cmsResult = null

  constructor (req) {
    this.details = req.body
  }

  process () {
    // get info and parse + validate
    this.validation = Joi.validate(this.details, schema)
    this.valid = result.error === null

    // if success format
    this.formatted = format(this.details)
  }

  result () {

    return {
      error: null,
      message: {}
    }
  }

  // post data to headless CMS <-- may need to make aysnc
  post () {
    // make api post request to CMS here
  }
}

module.exports = Order
