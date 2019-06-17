import React, { Component } from 'react'
import axios from 'axios'
import { writeToStore, getFromStore } from '../lib/storage'
import getConfig from 'next/config'
import { withRouter } from 'next/router'
import { get } from 'lodash'

import SingleProduct from '../containers/products/single'

class Product extends Component {

  static async getInitialProps ({ query }) {
    const { publicRuntimeConfig } = await getConfig()
    const { API_URL } = publicRuntimeConfig
    try {
      const product = getFromStore(query.id) || await axios.get(`${API_URL}/products/${query.id}`)
      let payload = {}

      if (product) {
        payload.product = (product.retrievedFromLocalStorage) ? product : { data: product.data }
      }

      return payload
    } catch (e) {
      console.error(new Error(e));
    }
  }

  render () {
    const { product } = this.props

    return (
      <SingleProduct product={get(product, 'data') || null} />
    )
  }

  componentDidMount () {
    if (!this.props.product.retrievedFromLocalStorage) {
      writeToStore(this.props.product.data._id, this.props.product.data)
    }
  }
}

export default withRouter(Product)
