import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash'

import axios from 'axios'
import { writeToStore, getFromStore } from '../lib/storage'
import getConfig from 'next/config'

import Link from 'next/link'
import Grid from '../components/partials/grid'
import GridItem from '../containers/products/grid-item'
import Cart from '../containers/checkout/cart'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
    <a>
      {props.title}
    </a>
    </Link>
  </li>
)

export default class Index extends Component {

  state = {
    contact: null,
    products: null,
    carousels: null,
    socials: null,
  }

  static async getInitialProps () {

    const { publicRuntimeConfig } = await getConfig()
    const { API_URL } = publicRuntimeConfig

    let payload = {}

    try {
      const socials = getFromStore('socials') || await axios.get(`${API_URL}/socials`)
      // turn products into a call to a preview
      const products = getFromStore('products') || await axios.get(`${API_URL}/products/preview`)
      const contact = getFromStore('contact') || await axios.get(`${API_URL}/contactdetails`)
      const carousels = getFromStore('carousels') || await axios.get(`${API_URL}/carousels`)

      if (socials) {
        payload.socials = (socials.retrievedFromLocalStorage) ? socials : { data: socials.data }
      }
      if (products) {
        payload.products = (products.retrievedFromLocalStorage) ? products : { data: products.data }
      }
      if (contact) {
        payload.contact = (contact.retrievedFromLocalStorage) ? contact : { data: contact.data }
      }
      if (carousels) {
        payload.carousels = (carousels.retrievedFromLocalStorage) ? carousels : { data: carousels.data }
      }

      return payload
    } catch (e) {
      console.error(e);
    }
  }

  componentWillMount () {
    const { products, contact, socials, carousels } = this.props

    this.setState({ socials, products, contact, carousels })
  }

  render () {
    const { products } = this.props

    return (
      <div className="header">
        <Link href='/about'><a>About</a></Link>
        <Cart />
        <h1>My Blog</h1>
        <ul>
          <PostLink id='hello-nextjs' title='Hello Next.js' />
          <PostLink id='learn-nextjs' title='Learn Next.js is awesome' />
          <PostLink id='deploy-nextjs' title='Deploy apps with Zeit' />
        </ul>
        <Grid>
          {products && products.data && products.data.map(product => (
            <GridItem key={product._id}
              image={product.image}
              name={product.Name}
              sku={product.sku}
              _id={product._id}
              price={product.price.toString()}
              />
          ))}
        </Grid>
      </div>
    )
  }

  componentDidMount () {
    for (const field in this.state) {
      if (!field.retrievedFromLocalStorage) {
        writeToStore(field, this.state[field].data)
      }
    }
  }
}
