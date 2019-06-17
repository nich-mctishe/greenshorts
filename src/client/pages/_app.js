import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { store, persistor } from '../storage'
import { PersistGate } from 'redux-persist/integration/react'

import '../assets/css/styles.scss'

class MyApp extends App {

  static async getInitialProps ({Component, ctx}) {

    // we can dispatch from here too
    // ctx.store.dispatch({type: 'FOO', payload: 'foo'})

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return (
      <Container>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </Container>
    )
  }

}

export default MyApp
