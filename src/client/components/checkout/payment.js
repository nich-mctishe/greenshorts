import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardElement, injectStripe } from 'react-stripe-elements'

class Payment extends Component {

  static propTypes = {
    firstname: PropTypes.string,
    lastname: PropTypes.string
  }

  static defaultProps = {
    firstname: '',
    lastname: ''
  }

  state = {
    complete: false,
    message: ''
  }

  submit = async (ev) => {
    const { firstname, lastname, stripe } = this.props

    if (firstname.length && lastname.length) {
      let { token, error } = await stripe.createToken({ name: `${firstname} ${lastname}` })
      
      if (!error) {
        let response = await fetch("/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: token.id
        });

        if (response.ok) console.log("Purchase Complete!")
      } else {
        return this.setState({ message: error.message || "unknown error occurred, please contact admin" })
      }
    }

    console.log('name not supplied')
  }

  render () {

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        {this.state.message && (
          <p>{this.state.message}</p>
        )}
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

export default injectStripe(Payment);
