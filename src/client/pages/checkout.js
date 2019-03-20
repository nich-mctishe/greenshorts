import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'
import dynamic from 'next/dynamic'

import {Elements, StripeProvider} from 'react-stripe-elements';

import Billing from '../containers/checkout/billing'
import Cart from '../containers/checkout/cart'

const Payment = dynamic(() => import('../containers/checkout/payment'), {
  ssr: false
})

export default class Checkout extends Component {

  state = {
    stripe: null
  }

  componentDidMount () {
    this.setState({
      stripe: window.Stripe("pk_test_WcJc0Es1FGxhOEBJ4OjFbC3V")
    });
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
                <Payment />
              </Elements>
            </aside>
          </div>
        </StripeProvider>
      </section>
    )

  }
}
