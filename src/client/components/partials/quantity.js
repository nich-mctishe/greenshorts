import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { find } from 'lodash'

 // put in helper in lib
const updateValue = (item, value) => {
  let i = item
  i.quantity = value

  return i
}

export default class Quantity extends Component {

  static propTypes = {
    items: PropTypes.array,
    item: PropTypes.object
  }

  static defaultProps = {
    items: [],
    item: {}
  }

  state = {
    item: {}
  }

  decrease = () => {
    const { item } = this.props
    const updatedItem = updateValue(item, Number(item.quantity) - 1)

    this.props.updateQuantity(updatedItem)
    this.setState({ item: updatedItem })
  }

  increase = () => {
    const { item } = this.props
    const updatedItem = updateValue(item, Number(item.quantity) + 1)

    this.props.updateQuantity(updatedItem)
    this.setState({ item: updatedItem })
  }

  input = event => {
    const { item } = this.props
    const updatedItem = updateValue(item, event.target.value)

    this.props.updateQuantity(updatedItem)
    this.setState({ item: updatedItem })
  }

  componentWillMount () {
    this.setState({ item: find(this.props.items, { product: { _id: this.props.item.product._id } }) })
  }

  render () {
    const { item, input } = this.state

    return (
      <div className='quantity'>
        <div>
          {item && item.quantity && item.quantity > 1 && (
            <div onClick={this.decrease}>-</div>
          )}
        </div>
        <div>
          <input type='number' value={item.quantity || 0} min='1' onChange={this.input}/>
        </div>
        <div>
          <div onClick={this.increase}>+</div>
        </div>
      </div>
    )
  }
}
