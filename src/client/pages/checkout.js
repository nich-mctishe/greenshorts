import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Wrapper from '../components/checkout/wrapper'
import axios from 'axios'
import { writeToStore, getFromStore } from '../lib/storage'
import getConfig from 'next/config'

const Payment = dynamic(() => import('../containers/checkout/wrapper'), {
  ssr: false
})

export default class Checkout extends Component {

  state = {
    stripe: null
  }

  static async getInitialProps () {
    const { publicRuntimeConfig } = await getConfig()
    const { API_URL } = publicRuntimeConfig
    const deliveryOptions = getFromStore('deliveryoptions') || await axios.get(`${API_URL}/deliveryoptions`)
    let payload = {}

    if (deliveryOptions) {
      payload.deliveryOptions = (deliveryOptions.retrievedFromLocalStorage) ? deliveryOptions : { data: deliveryOptions.data }
    }

    return payload
  }

  async componentDidMount () {
    const { publicRuntimeConfig } = await getConfig()
    const { STRIPE_KEY } = publicRuntimeConfig

    this.setState({
      stripe: window.Stripe(STRIPE_KEY)
    });

    if (!this.props.deliveryOptions.retrievedFromLocalStorage) {
      writeToStore('deliveryoptions', this.props.deliveryOptions.data )
    }
  }

  render () {

    // check cart contents and redirect to index (or products) if cart is empty

    return (
      <Payment
        stripe={this.state.stripe}
        deliveryOptions={this.props.deliveryOptions}
      />
    )

  }
}
