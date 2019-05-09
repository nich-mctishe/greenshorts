import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { find, get, isEqual } from 'lodash'

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
      let countries = option.countries.split(' ,')
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

class Payment extends Component {

  static propTypes = {
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    billingAddressLine1: PropTypes.string,
    billingAddressLine2: PropTypes.string,
    billingAddressLine3: PropTypes.string,
    billingCity: PropTypes.string,
    billingCounty: PropTypes.string,
    billingCountry: PropTypes.string,
    billingPostcode: PropTypes.string,
    shippingName: PropTypes.string,
    shippingAddressLine1: PropTypes.string,
    shippingAddressLine2: PropTypes.string,
    shippingAddressLine3: PropTypes.string,
    shippingCity: PropTypes.string,
    shippingCounty: PropTypes.string,
    shippingCountry: PropTypes.string,
    shippingPostcode: PropTypes.string,
    tandc: PropTypes.bool,
    instructions: PropTypes.string,
    contactTime:PropTypes.string,
    items: PropTypes.array,
    value: PropTypes.number,
    deliveryOptions: PropTypes.array
  }

  static defaultProps = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingAddressLine3: '',
    billingCity: '',
    billingCounty: '',
    billingCountry: '',
    billingPostcode: '',
    shippingName: '',
    shippingAddressLine1: '',
    shippingAddressLine2: '',
    shippingAddressLine3: '',
    shippingCity: '',
    shippingCounty: '',
    shippingCountry: '',
    shippingPostcode: '',
    tandc: false,
    instructions: '',
    contactTime:'',
    items: [],
    value: '',
    deliveryOptions: []
  }

  state = {
    complete: false,
    total: this.props.value,
    shippingOption: null,
    messages: []
  }

  formatBody = _ => {
    let body = {
      token: token.id,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      email: this.props.email,
      phone: this.props.phone,
      billingAddressLine1: this.props.billingAddressLine1,
      billingCity: this.props.billingCity,
      billingCountry: this.props.billingCountry,
      billingPostcode: this.props.billingPostcode,
      shippingName: this.props.shippingName,
      shippingAddressLine1: this.props.shippingAddressLine1,
      shippingCity: this.props.shippingCity,
      shippingCountry: this.props.shippingCountry,
      shippingPostcode: this.props.shippingPostcode,
      tandc: this.props.tandc,
      items: this.props.items,
      subtotal: this.props.value,
      total: this.state.total
    }

    if (this.props.billingAddressLine2) {
      body.billingAddressLine2 = this.props.billingAddressLine2
    }
    if (this.props.billingAddressLine3) {
      body.billingAddressLine3 = this.props.billingAddressLine3
    }
    if (this.props.billingCounty) {
      body.billingCounty = this.props.billingCounty
    }
    if (this.props.shippingAddressLine2) {
      body.shippingAddressLine2 = this.props.shippingAddressLine2
    }
    if (this.props.shippingAddressLine3) {
      body.shippingAddressLine3 = this.props.shippingAddressLine3
    }
    if (this.props.shippingCounty) {
      body.shippingCounty = this.props.shippingCounty
    }
    if (this.props.instructions) {
      body.instructions = this.props.instructions
    }
    if (this.props.contactTime) {
      body.contactTime = this.props.contactTime
    }

    return JSON.stringify(body)
  }

  hasAllAttributes () {
    if (
      this.props.firstname &&
      this.props.lastname &&
      this.props.email &&
      this.props.phone &&
      this.props.billingAddressLine1 &&
      this.props.billingCity &&
      this.props.billingCountry &&
      this.props.billingPostcode &&
      this.props.shippingName &&
      this.props.shippingAddressLine1 &&
      this.props.shippingCity &&
      this.props.shippingCountry &&
      this.props.shippingPostcode &&
      this.props.tandc &&
      this.props.items.length &&
      this.ptops.value
    ) {
      return true
    }

    return false
  }

  componentWillMount () {
    const { value, deliveryOptions, shippingCountry } = this.props
    console.log('mounting');
    const shippingOption = getShippingOption(shippingCountry, deliveryOptions)
    const total = assertTotal(value, shippingOption)

    this.setState({ total, shippingOption })
  }

  componentWillUpdate () {
    console.log('updating');
    const { value, deliveryOptions, shippingCountry } = this.props
    //console.log('value', value);
    //console.log('deliveryOptions', deliveryOptions);
    console.log('shippingCountry', shippingCountry);

    console.log('hasAllAttributes', this.hasAllAttributes());

    const shippingOption = getShippingOption(shippingCountry, deliveryOptions)
    const total = assertTotal(value, shippingOption)


    //console.log('total', total);

    let update = {}
    if (total !== this.state.total) {
      update.total = total
    }

    //console.log('shippingOption', shippingOption);
    //console.log('state shippingOption', this.state.shippingOption);
    //console.log(!isEqual(shippingOption, this.state.shippingOption));

    if (!isEqual(shippingOption, this.state.shippingOption)) {
      update.shippingOption = shippingOption
    }

    if (Object.keys(update).length) {
      this.setState(update)
    }
  }

  submit = async (ev) => {
    const { firstname, lastname, stripe } = this.props

    // will need to hook up to redux
    if (firstname.length && lastname.length) {
      const { token, error } = await stripe.createToken({ name: `${firstname} ${lastname}` })

      if (!error) {


        const response = await fetch('/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: this.formatBody()
        });

        if (response.ok) {
          console.log("Purchase Complete!") // amend to display better splash page
        } else {
          const error = await response.json()

          return this.setState({ messages: error.messages || "unknown error occurred, please contact admin" })
        }
      } else {
        return this.setState({ messages: error.message || "unknown error occurred, please contact admin" })
      }
    }

    console.log('name not supplied')
  }

  render () {

    return (
      <div className="checkout">
        <p>subtotal : {this.props.value}</p>
        {this.state.shippingOption && (
          <p>delivery: {this.state.shippingOption.service} = {Number(this.state.shippingOption.cost).toFixed(2)}</p>
        )}
        <p>total:{this.state.total}</p>
        <p>PLease enter your card details to complete the purchase</p>
        {this.state.messages.map(message => (
            <p key={message.context.key}>{message.message}</p>
        ))}
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

export default injectStripe(Payment);
