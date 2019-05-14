import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { assertTotal, getShippingOption } from '../../lib/checkout'

export default class Success extends Component {

  static propTypes = {
    items: PropTypes.array,
    subtotal: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    billingAddressLine1: PropTypes.string,
    billingAddressLine2: PropTypes.string,
    billingAddressLine3: PropTypes.string,
    billingCity: PropTypes.string,
    billingCounty: PropTypes.string,
    billingPostcode: PropTypes.string,
    billingCountry: PropTypes.string,
    shippingAddressLine1: PropTypes.string,
    shippingAddressLine2: PropTypes.string,
    shippingAddressLine3: PropTypes.string,
    shippingCity: PropTypes.string,
    shippingCounty: PropTypes.string,
    shippingPostcode: PropTypes.string,
    shippingCountry: PropTypes.string,
    deliveryOptions: PropTypes.array
  }

  static defaultProps = {
    items: [],
    subtotal: 0,
    firstname: '',
    lastname: '',
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingAddressLine3: '',
    billingCity: '',
    billingCounty: '',
    billingPostcode: '',
    billingCountry: '',
    shippingAddressLine1: '',
    shippingAddressLine2: '',
    shippingAddressLine3: '',
    shippingCity: '',
    shippingCounty: '',
    shippingPostcode: '',
    shippingCountry: '',
    shippingOptions: null
  }

  state = {
    shippingOption: null
  }

  formatAddress (props, type) {
    const name = type === 'billing' ? `${props.firstname} ${props.lastname}` : props.shippingName
    const addressLine2 = props[type + 'AddressLine2'] ? (<span>{props[`${type}AddressLine2`]}<br /></span>) : ''
    const addressLine3 = props[type + 'AddressLine3'] ? (<span>{props[`${type}AddressLine2`]}<br /></span>) : ''
    const county = props[type + 'County'] ? (<span>{props[`${type}County`]}<br /></span>) : ''

    return (
      <p>
        {name}<br />
        {props[type + 'AddressLine1']}<br />
        {addressLine2}
        {addressLine3}
        {props[type + 'City']}<br />
        {county}
        {props[type + 'Postcode']}<br />
        {props[type + 'Country']}
      </p>
    )
  }

  componentWillMount () {
    // will need to check whether payment has been made
    if (!this.state.shippingOption && this.props.deliveryOptions) {
      this.setState({ shippingOption: getShippingOption(this.props.shippingCountry, this.props.deliveryOptions) })
    }
  }

  render () {
    return (
      <section>
        <h1>Your order has been placed!</h1>
        <h2>whats in your order:</h2>
        <ul>
        {this.props.items && this.props.items.map(item => (
          <li key={item.product._id}>{item.quantity} x {item.product.name}, {item.size} = £{item['total-cost']}</li>
        ))}
        </ul>
        <h2>Billing Address</h2>
        <div>{this.formatAddress(this.props, 'billing')}</div>
        <h2>Delivery Address</h2>
        <div>{this.formatAddress(this.props, 'shipping')}</div>
        <h3>Subtotal = £{Number(this.props.subtotal).toFixed(2)}</h3>
        <h3>Delivery = £{Number(this.state.shippingOption.cost).toFixed(2)}</h3>
        <h3>Total = £{(Number(this.props.subtotal) + Number(this.state.shippingOption.cost)).toFixed(2)}</h3>
        <p>You will receive an email when your order is ready to ship</p>
      </section>
    )
  }

  // here is where we could unset the paid varible
  componentWillUnmount () {
    this.props.setPaid(false)
    this.props.emptyCart()
  }
}
