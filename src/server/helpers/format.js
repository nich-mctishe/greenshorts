
/**
 * This helper is where you would put payment and api details to be formatted for their various jobs
 */

/**
 * BASE OBJECT
 */
 // return {
 //   token: data.token,
 //   firstname: data.firstname,
 //   lastname: data.lastname,
 //   email: data.email,
 //   phone: data.phone,
 //   billingAddressLine1: data.billingAddressLine1,
 //   billingAddressLine2: data.billingAddressLine2,
 //   billingAddressLine3: data.billingAddressLine3,
 //   billingCity: data.billingCity,
 //   billingPostcode: data.billingPostcode,
 //   shippingName: data.shippingName || `${data.firstname} ${data.lastname}`,
 //   shippingAddressLine1: data.shippingAddressLine1,
 //   shippingAddressLine2: data.shippingAddressLine2,
 //   shippingAddressLine3: data.shippingAddressLine3,
 //   shippingCity: data.shippingCity,
 //   shippingPostcode: data.shippingPostcode,
 //   tandc: data.tandc,
 //   contactTime: data.contactTime,
 //   items: data.items, // this may need to be formatted for insertion
 //   paid: extra && extra.paid,
 //   value: data.value
 // }

module.exports = (data, extra) => {

  return {
    payment: {
      stripe: () => {
        return {
          amount: data.total,
          currency: 'gbp',
          description: `charge for ${data.firstname} ${data.lastname} at approx. ${Date.now()}`,
          billing_details: {
            address: {
              city: data.billingCity,
              country: data.billingCountry,
              line1: data.billingAddressLine1,
              line2: `${data.billingAddressLine2} ${data.billingAddressLine3 || ''}`,
              postal_code: data.billingPostcode,
              state: data.billingCounty
            },
            shipping: {
              city: data.shippingCity,
              country: data.billingCountry,
              line1: data.shippingAddressLine1,
              line2: `${data.shippingAddressLine2} ${data.shippingAddressLine3 || ''}`,
              postal_code: data.shippingPostcode,
              state: data.shippingCounty
            },
            email: data.email,
            name: `${data.firstname} ${data.lastname}`,
            phone: data.phone
          }
        }
      }
    },
    apis: {
      strapi: () => {
        let addresses = {
          billingAddress: `${data.firstname} ${data.lastname}\n${data.billingAddressLine1}\n`,
          shippingAddress: `${data.shippingName || data.firstname + ' ' + data.lastname}\n${data.shippingAddressLine1}\n`
        }
        ;['billing', 'shipping'].forEach(address => {
          if (data[`${address}AddressLine2`]) {
            addresses[address + 'Address'] += `${data[address + 'AddressLine2']}\n`
          }
          if (data[`${address}AddressLine3`]) {
            addresses[address + 'Address'] += `${data[address + 'AddressLine3']}\n`
          }

          addresses[address + 'Address'] += `${data[address + 'City']}\n`

          if (data[`${address}County`]) {
            addresses[address + 'Address'] += `${data[address + 'County']}\n`
          }

          addresses[address + 'Address'] += `${data[address + 'Postcode']}`
        })

        let format = {
          firstname: data.firstname,
          lastname: data.lastname,
          subtotal: data.subtotal,
          total: data.total,
          email: data.email,
          phone: data.phone,
          'billing-address': addresses.billingAddress,
          billingcountry: data.billingCountry,
          'shipping-address': addresses.shippingAddress,
          shippingcountry: data.shippingCountry,
          'contact-time': data.contactTime || null,
          instructions: data.instructions || null,
          paid: extra && extra.paid,
          'stripe-token': (extra && extra.token) || data.token,
          items: data.items
        }

        if (data.number) {
          format.number = data.number
        }

        if (data.exceptions) {
          format.exceptions = data.exceptions
        }

        return format
      }
    }
  }
}
