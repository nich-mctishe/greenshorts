import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Quantity from '../../containers/partials/quantity'
import { getPrice } from '../../lib/checkout'

export default class Cart extends Component {
  static propTypes = {
    items: PropTypes.array,
    value: PropTypes.number
  }

  static defaultProps = {
    items: [],
    value: 0
  }

  remove = item => () => {
    this.props.remove(item)
  }

  render () {
    const { items, value, empty } = this.props

    return (
      <section className="cart">
        <div className="cart--intro">
          {!items.length && (
            <span>There is nothing in your cart!</span>
          )}
          {items.length > 0 && (
            <span>There {items.length > 1 ? 'are' : 'is'} {items.length} item{items.length > 1 ? 's' : ''} in your cart</span>
          )}
        </div>
        <div className="cart--list">
          {items.length > 0 && (
            <ul>
              {items.map((item, i) => (
                <li className="cart--item" key={i}>
                  <div>
                    <div className="item--details">
                      <ul>
                        <li>
                          {item.product.name}
                        </li>
                        <li>
                          £{item.price}
                        </li>
                        <li>
                          <Quantity item={item} />
                        </li>
                        <li>
                          <button onClick={this.remove(item)}>remove</button>
                        </li>
                      </ul>
                    </div>
                    <div className="item--total">
                      <h4>£{getPrice(item.price, item.quantity)}</h4>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="cart--total">
          <span>£{value}</span>
        </div>
        <div className="cart--checkout-icon">
          <Link href="/checkout">
            <a>checkout</a>
          </Link>
        </div>
        <div className="cart--empty-icon">
          <button onClick={empty}>Empty Cart</button>
        </div>
      </section>
    )
  }
}
