import { find, get } from 'lodash'

const getPrice = (cost, quantity) => {
  return Number(cost) * Number(quantity)
}

const assertTotal = (subtotal, shippingOption) => {
  let total = subtotal

  if (shippingOption && get(shippingOption, 'cost')) {
    total+= shippingOption.cost
  }

  return total
}

const getShippingOption = (country, shippingOptions) => {
  let shippingOption = null
  if (!shippingOptions && !get(shippingOptions, 'length')) {
    console.error('Payment.js: no shipping options have been set in parent API')
  }

  if (country) {
    shippingOptions.forEach(option => {
      let countries = option.countries.split(', ')
      countries.forEach(c => {
        if (c === country) {
          shippingOption = option
        }
      })
    })

    if (!shippingOption) {
      shippingOption = find(shippingOptions, { default: true }) || null
    }
  }

  return shippingOption
}

module.exports = { getPrice, assertTotal, getShippingOption }
