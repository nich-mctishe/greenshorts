
export const SET_FIRSTNAME = 'SET_FIRSTNAME'
export const SET_LASTNAME = 'SET_LASTNAME'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_PHONE = 'SET_PHONE'

export const SET_CONTACT_TIME = 'SET_CONTACT_TIME'

export const SET_BILLING_LINE_1 = 'SET_BILLING_LINE_1'
export const SET_BILLING_LINE_2 = 'SET_BILLING_LINE_2'
export const SET_BILLING_LINE_3 = 'SET_BILLING_LINE_3'
export const SET_BILLING_CITY = 'SET_BILLING_CITY'
export const SET_BILLING_COUNTY = 'SET_BILLING_COUNTY'
export const SET_BILLING_POSTCODE = 'SET_BILLING_POSTCODE'

export const SET_SAME_ADDRESS = 'SET_SAME_ADDRESS'

export const SET_SHIPPING_NAME = 'SET_SHIPPING_NAME'
export const SET_SHIPPING_LINE_1 = 'SET_SHIPPING_LINE_1'
export const SET_SHIPPING_LINE_2 = 'SET_SHIPPING_LINE_2'
export const SET_SHIPPING_LINE_3 = 'SET_SHIPPING_LINE_3'
export const SET_SHIPPING_CITY = 'SET_SHIPPING_CITY'
export const SET_SHIPPING_COUNTY = 'SET_SHIPPING_COUNTY'
export const SET_SHIPPING_POSTCODE = 'SET_BILLING_POSTCODE'

export const SET_READ_TANDC = 'SET_READ_TANDC'

export const SET_INSTRUCTIONS = 'SET_INSTRUCTIONS'

export const  IS_PAID = 'IS_PAID'
export const  IS_SAVED_TO_DB = 'IS_SAVED_TO_DB'
export const  IS_EMAIL_SENT = 'IS_EMAIL_SENT'

// could just make a UPDATE_CHECKOUT action (could test)
// the reducer will then work out what needs to be done.

// possible shortcut
const cartAction = (data, action) => {
  return { type: action, data }
}

export function setFirstname (item) {
  return { type: SET_FIRSTNAME, item }
}

export function setLastname (item) {
  return { type: SET_LASTNAME, item }
}

export function setEmail (item) {
  return { type: SET_EMAIL, item }
}

export function setPhone (item) {
  return { type: SET_PHONE, item }
}

export function setContactTime (item) {
  return { type: SET_CONTACT_TIME, item }
}

export function setBillingLine1 (item) {
  return { type: SET_BILLING_LINE_1, item }
}

export function setBillingLine2 (item) {
  return { type: SET_BILLING_LINE_2, item }
}

export function setBillingLine3 (item) {
  return { type: SET_BILLING_LINE_3, item }
}

export function setBillingCity (item) {
  return { type: SET_BILLING_CITY, item }
}

export function setBillingCounty (item) {
  return { type: SET_BILLING_COUNTY, item }
}

export function setBillingPostcode (item) {
  return { type: SET_BILLING_POSTCODE, item }
}

export function setSameAddress (item) {
  return { type: SET_SAME_ADDRESS, item }
}

export function setShippingName (item) {
  return { type: SET_SHIPPING_NAME, item }
}

export function setShippingLine1 (item) {
  return { type: SET_SHIPPING_LINE_1, item }
}

export function setShippingLine2 (item) {
  return { type: SET_SHIPPING_LINE_2, item }
}

export function setShippingLine3 (item) {
  return { type: SET_SHIPPING_LINE_3, item }
}

export function setShippingCity (item) {
  return { type: SET_SHIPPING_CITY, item }
}

export function setShippingCounty (item) {
  return { type: SET_SHIPPING_COUNTY, item }
}

export function setShippingPostcode (item) {
  return { type: SET_SHIPPING_POSTCODE, item }
}

export function setReadTandc (item) {
  return { type: SET_READ_TANDC, item }
}

export function setInstructions (item) {
  return { type: SET_INSTRUCTIONS, item }
}
