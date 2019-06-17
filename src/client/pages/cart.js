import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cart from '../containers/checkout/cart'
import Link from 'next/link'

export default class CartPage extends Component {

  render () {
    return (
      <section className="page">
        <Cart />
        <Link href="/">
          <a>keep shopping</a>
        </Link>
      </section>
    )
  }
}
