import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { findIndex } from 'lodash'

// this could go in lib as a helper.
const formatItem = (props, quantity) => {
  return {
    name: props.name,
    sku: props.sku,
    quantity: quantity,
    price: Number(props.price)
  }
}

export default class GridItem extends Component {

  static propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    sku: PropTypes.string,
    price: PropTypes.string
  }

  static defaultProps = {
    image: './static/images/product-1.jpg',
    name: 'Test Product',
    sku: '12345',
    price: '20.99'
  }

  onClick = () => {
    if ( findIndex(this.props.items, {sku: this.props.sku}) === -1 ) {
      console.log('fired');
      this.props.onClick(formatItem(this.props, 1))
    }
  }

  render () {
    return (
      <div className="shop--item">
        <div className="top">
          <div className="img--wrapper">
            <div className="img" style={{backgroundImage: `url(${this.props.image})`}}/>
          </div>
        </div>
        <div className="bottom">
          <div className="wrapper">
            <h3>{this.props.name}</h3>
            <p>£{this.props.price}</p>

            <button onClick={this.onClick}>add to cart</button>
          </div>
        </div>
      </div>
    )
  }
}
