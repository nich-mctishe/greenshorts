import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import Router from 'next/router'

import { Elements, StripeProvider } from 'react-stripe-elements';

import Billing from '../../containers/checkout/billing'
import Cart from '../../containers/checkout/cart'
import Success from '../../containers/checkout/success'

const Payment = dynamic(() => import('../../containers/checkout/payment'), {
  ssr: false
})

export default class Wrapper extends Component {

  static propTypes = {
    deliveryOptions: PropTypes.object,
    items: PropTypes.array,
    isPaid: PropTypes.bool,
    stripe: PropTypes.object
  }

  static defaultProps = {
    deliveryOptions: [],
    items: [],
    isPaid: false
  }

  /**
   * TODO: account for if oyu get here adn isPaid is true but the cart hasItems in it.
   */

  componentWillMount () {
    const { items } = this.props

    // if cart is empty redirect to cart
    if (!items.length) {
      return Router.push('/cart')
    }
  }

  render () {
    const { items, isPaid } = this.props
    let content = null

    console.log('isPaid,', isPaid);

    // if payment is complete render success page
    if (!isPaid) {
      content = (
        <StripeProvider stripe={this.props.stripe}>
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
      )
    } else {
      content = (
        <Success deliveryOptions={this.props.deliveryOptions.data || []}/>
      )
    }

    return (
      <section className="page">
        <Link href="/"><a>back</a></Link>
        {content}
      </section>
    )
  }
}
