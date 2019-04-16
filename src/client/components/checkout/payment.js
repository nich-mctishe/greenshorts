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
    messages: []
  }

  submit = async (ev) => {
    const { firstname, lastname, stripe } = this.props

    // will need to hook up to redux
    if (firstname.length && lastname.length) {
      const { token, error } = await stripe.createToken({ name: `${firstname} ${lastname}` })

      if (!error) {
        const response = await fetch("/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: JSON.stringify({
            token: token.id,
            firstname,
            lastname
          })
        });

        if (response.ok) {
          console.log("Purchase Complete!") // amend to display better splash page
        } else {
          const error = await response.json()

          return this.setState({ messages: error.messages || "unknown error occurred, please contact admin" })
        }
      } else {
        return this.setState({ messages: error.message || "unknown error occurred, please contact admin" })
      }
    }

    console.log('name not supplied')
  }

  render () {

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        {this.state.messages.map(message => (
            <p key={message.context.key}>{message.message}</p>
        ))}
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

export default injectStripe(Payment);
