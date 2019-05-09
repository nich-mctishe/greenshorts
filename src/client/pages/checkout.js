import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'
import dynamic from 'next/dynamic'

import {Elements, StripeProvider} from 'react-stripe-elements';

import Billing from '../containers/checkout/billing'
import Cart from '../containers/checkout/cart'

import axios from 'axios'
import { writeToStore, getFromStore } from '../lib/storage'
import getConfig from 'next/config'

const Payment = dynamic(() => import('../containers/checkout/payment'), {
  ssr: false
})

export default class Checkout extends Component {

  state = {
    stripe: null
  }

  static async getInitialProps () {
    const { publicRuntimeConfig } = await getConfig();
    const { API_URL } = publicRuntimeConfig
    const deliveryOptions = getFromStore('deliveryoptions') || await axios.get(`${API_URL}/deliveryoptions`)
    let payload = {}

    if (deliveryOptions) {
      payload.deliveryOptions = (deliveryOptions.retrievedFromLocalStorage) ? deliveryOptions : { data: deliveryOptions.data }
    }

    return payload
  }

  componentDidMount () {
    this.setState({
      stripe: window.Stripe("pk_test_WcJc0Es1FGxhOEBJ4OjFbC3V")
    });

    if (!this.props.deliveryOptions.retrievedFromLocalStorage) {
      writeToStore('deliveryoptions', this.props.deliveryOptions.data )
    }
  }

  render () {

    // check cart contents and redirect to index (or products) if cart is empty

    return (
      <section className="page">
        <Link href="/"><a>back</a></Link>
        <StripeProvider stripe={this.state.stripe}>
          <div className="example">
            <h1>React Stripe Elements Example</h1>
            <Billing />
            <aside>
              <Cart />
              <Elements>
                <Payment deliveryOptions={this.props.deliveryOptions.data || []}/>
              </Elements>
            </aside>
          </div>
        </StripeProvider>
      </section>
    )

  }
}
