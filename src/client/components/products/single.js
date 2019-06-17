import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { formatItem } from '../../lib/cart'
import Router from 'next/router'
import Quantity from '../partials/quantity'

const SIZES = [
  'S', 'M', 'L', 'XL'
]

export default class Product extends Component {

  static propTypes = {
    product: PropTypes.object
  }

  static defaultProps = {
    product: null
  }

  // update size later
  state = {
    size: 'M',
    quantity: 1
  }

  onClick = () => {
    this.props.onClick(formatItem(this.props.product, this.state, this.state.quantity))
    return Router.push('/cart')
  }

  setSize = event => {
    if (this.state.size !== event.target.value) {
      this.setState({ size: event.target.value })
    }
  }

  updateQuantity = value => {
    if (this.state.quantity !== value) {
      this.setState({ quantity: Number(value.quantity) })
    }
  }

  render () {
    const { product } = this.props
    if (!product) {
      return null
    }

    const crossSells = product['x-sells'].concat(product.x_sells)

    return (
      <section className="page">
        <h1>{product.Name}</h1>
        <p>{product.description}</p>
        {product.images.length && product.images.map(image => (
          <img key={image.id} src={image.url} />
        ))}
        <h2>£{Number(product.price).toFixed(2)}</h2>
        <Quantity
          item={Object.assign({ quantity: this.state.quantity }, product)}
          updateQuantity={this.updateQuantity}
          single={true} />
        <p>Please select a size</p>
        <select name="size" onChange={this.props.setSize} value={this.props.size}>
          {SIZES && SIZES.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <button onClick={this.onClick}>add to cart</button>

        {crossSells.length && (<h4>Related Items</h4>)}
        {crossSells.length && crossSells.map(x => (
          <Link key={x._id} as={`/products/${x._id}`} href={`/product?id=${x._id}`}>
          <a>
            <div key={x.id}>
              <p><strong>{x.Name}</strong></p>
              {x.images && (<img src={x.images[0].url} />)}
              <p>{x.price}</p>
            </div>
          </a>
          </Link>
        ))}
      </section>
    )
  }
}
