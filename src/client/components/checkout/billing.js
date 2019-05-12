import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FieldWrapper from '../partials/field-wrapper'

import Countries from '../partials/countries'

import { upperFirst } from 'lodash'

import validate from '../../lib/validation'

const fields = {
  firstname: 'required',
  lastname: 'required',
  email: 'required|email',
  phone: 'required|phone',
  billingAddressLine1: 'required',
  billingAddressLine2: '',
  billingAddressLine3: '',
  billingCity: 'required',
  billingCounty: '',
  billingPostcode: 'required',
  billingCountry: 'required',
  shippingName: 'required',
  shippingAddressLine1: 'required',
  shippingAddressLine2: '',
  shippingAddressLine3: '',
  shippingCity: 'required',
  shippingCounty: '',
  shippingPostcode: 'required',
  shippingCountry: 'required',
  shippingIsBilling: 'bool',
  tandc: 'required|bool',
  instructions: '',
  contactTime: 'required'
}

class Billing extends Component {

  static propTypes = {
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    billingAddressLine1: PropTypes.string,
    billingAddressLine2: PropTypes.string,
    billingAddressLine3: PropTypes.string,
    billingCity: PropTypes.string,
    billingCounty: PropTypes.string,
    billingPostcode: PropTypes.string,
    shippingName: PropTypes.string,
    shippingAddressLine1: PropTypes.string,
    shippingAddressLine2: PropTypes.string,
    shippingAddressLine3: PropTypes.string,
    shippingCity: PropTypes.string,
    shippingCounty: PropTypes.string,
    shippingPostcode: PropTypes.string,
    shippingIsBilling: PropTypes.bool,
    tandc: PropTypes.bool,
    instructions: PropTypes.string,
    contactTime: PropTypes.string
  }

  // may need a state for messages with an is updating thing

  state = {
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    billingAddressLine1: null,
    billingAddressLine2: null,
    billingAddressLine3: null,
    billingCity: null,
    billingCounty: null,
    billingPostcode: null,
    shippingName: null,
    shippingAddressLine1: null,
    shippingAddressLine2: null,
    shippingAddressLine3: null,
    shippingCity: null,
    shippingCounty: null,
    shippingPostcode: null,
    shippingIsBilling: null,
    tandc: null,
    instructions: null,
    contactTime: null
  }

  update = (event) => {
    const valid = validate(fields, event.target.name, event.target.type !== 'checkbox' ? event.target.value : event.target.checked)
    let stateToUpdate = {
      [event.target.name]: null
    }
    if (!!this.props[`set${upperFirst(event.target.name)}`]) {
      if (valid.success) {
        this.setState(stateToUpdate) // resets it back to null if it has been fixed

        return this.props[`set${upperFirst(event.target.name)}`](event.target.type !== 'checkbox' ? event.target.value : event.target.checked)
      } else {
        stateToUpdate[event.target.name] = valid.messages[event.target.name]

        return this.setState(stateToUpdate)
      }
    }

    console.error(`unable to update field ${event.target.name} the supporting function does not exist!`)
  }

  render () {

    return (
      <section>
        <form>
          <h3>You</h3>
          <FieldWrapper name='firstname' title='Firstname' messages={this.state.firstname}>
            <input
              className="input"
              name="firstname"
              type="text"
              placeholder="Joe"
              defaultValue={this.props.firstname}
              onBlur={this.update}
              tabIndex="1"
            />
          </FieldWrapper>
          <FieldWrapper name='lastname' title='Lastname' messages={this.state.lastname}>
            <input
              className="input"
              name="lastname"
              type="text"
              placeholder="Bloggs"
              defaultValue={this.props.lastname}
              onBlur={this.update}
              tabIndex="2"
            />
          </FieldWrapper>
          <FieldWrapper name='email' title='Email Address' messages={this.state.email}>
            <input
              className="input"
              name="email"
              type="email"
              placeholder="joe@blogger.com"
              defaultValue={this.props.email}
              onBlur={this.update}
              tabIndex="3"
            />
          </FieldWrapper>
          <FieldWrapper name='phone' title='Phone Number' messages={this.state.phone}>
            <input
              className="input"
              name="phone"
              type="tel"
              placeholder="Your digits"
              defaultValue={this.props.phone}
              onBlur={this.update}
              tabIndex="4"
            />
          </FieldWrapper>
          <FieldWrapper name='contactTime' title={`when's best to contact you regarding fittings and needs?`} messages={this.state.contactTime}>
            <input
              className="input"
              name="contactTime"
              type="text"
              placeholder=""
              defaultValue={this.props.contactTime}
              onBlur={this.update}
              tabIndex="5"
            />
          </FieldWrapper>
          <h3>Your billing address</h3>
          <FieldWrapper name='billingAddressLine1' title='Address Line 1' messages={this.state.billingAddressLine1}>
            <input
              className="input"
              name="billingAddressLine1"
              type="text"
              placeholder="my house"
              defaultValue={this.props.billingAddressLine1}
              onBlur={this.update}
              tabIndex="6"
            />
          </FieldWrapper>
          <FieldWrapper name='billingAddressLine2' title='Address Line 2' messages={this.state.billingAddressLine2}>
            <input
              className="input"
              name="billingAddressLine2"
              type="text"
              placeholder="123 street lane"
              defaultValue={this.props.billingAddressLine2}
              onBlur={this.update}
              tabIndex="7"
            />
          </FieldWrapper>
          <FieldWrapper name='billingAddressLine3' title='Address Line 3' messages={this.state.billingAddressLine3}>
            <input
              className="input"
              name="billingAddressLine3"
              type="text"
              placeholder=""
              defaultValue={this.props.billingAddressLine3}
              onBlur={this.update}
              tabIndex="8"
            />
          </FieldWrapper>
          <FieldWrapper name='billingCity' title='City' messages={this.state.billingCity}>
            <input
              className="input"
              name="billingCity"
              type="text"
              placeholder="Townsbury"
              defaultValue={this.props.billingCity}
              onBlur={this.update}
              tabIndex="9"
            />
          </FieldWrapper>
          <FieldWrapper name='billingCounty' title='County' messages={this.state.billingCounty}>
            <input
              className="input"
              name="billingCounty"
              type="text"
              placeholder="Countyshire"
              defaultValue={this.props.billingCounty}
              onBlur={this.update}
              tabIndex="10"
            />
          </FieldWrapper>
          <FieldWrapper name='billingPostcode' title='Postcode' messages={this.state.billingPostcode}>
            <input
              className="input"
              name="billingPostcode"
              type="text"
              placeholder="TO5 1EG"
              defaultValue={this.props.billingPostcode}
              onBlur={this.update}
              tabIndex="11"
            />
          </FieldWrapper>
          <FieldWrapper name='billingCountry' title='Country' messages={this.state.billingCountry}>
            <Countries
              className="input"
              name="billingCountry"
              onChange={this.update}
              tabIndex="12"
              value={this.props.billingCountry}
            />
          </FieldWrapper>
          <h3>Your shipping info</h3>
          <FieldWrapper name='shippingIsBilling' title='Use Same Shipping address as Billing' messages={this.state.shippingIsBilling}>
            <input
              className="checkbox"
              name="shippingIsBilling"
              type="checkbox"
              defaultChecked={this.props.shippingIsBilling}
              onChange={this.update}
              tabIndex="13"
            />
          </FieldWrapper>
          <FieldWrapper name='shippingName' title='Name' messages={this.state.shippingName}>
            <input
              className="input"
              name="shippingName"
              type="text"
              placeholder="Joe Bloggs"
              defaultValue={this.props.shippingName}
              onBlur={this.update}
              tabIndex="14"
            />
          </FieldWrapper>
          <FieldWrapper name='shippingAddressLine1' title='Address Line 1' messages={this.state.shippingAddressLine1}>
            <input
              className="input"
              name="shippingAddressLine1"
              type="text"
              placeholder="my house"
              defaultValue={this.props.shippingAddressLine1}
              onBlur={this.update}
              tabIndex="15"
            />
          </FieldWrapper>
          <FieldWrapper name='shippingAddressLine2' title='Address Line 2' messages={this.state.shippingAddressLine2}>
            <input
              className="input"
              name="shippingAddressLine2"
              type="text"
              placeholder="123 street lane"
              defaultValue={this.props.shippingAddressLine2}
              onBlur={this.update}
              tabIndex="16"
            />
          </FieldWrapper>
          <FieldWrapper name='shippingAddressLine3' title='Address Line 3' messages={this.state.shippingAddressLine3}>
            <input
              className="input"
              name="shippingAddressLine3"
              type="text"
              placeholder=""
              defaultValue={this.props.shippingAddressLine3}
              onBlur={this.update}
              tabIndex="17"
            />
          </FieldWrapper>
          <FieldWrapper name='shippingCity' title='City' messages={this.state.shippingCity}>
            <input
              className="input"
              name="shippingCity"
              type="text"
              placeholder="Townsbury"
              defaultValue={this.props.shippingCity}
              onBlur={this.update}
              tabIndex="18"
            />
          </FieldWrapper>
          <FieldWrapper name='shippingCounty' title='County' messages={this.state.shippingCounty}>
            <input
              className="input"
              name="shippingCounty"
              type="text"
              placeholder="Countyshire"
              defaultValue={this.props.shippingCounty}
              onBlur={this.update}
              tabIndex="19"
            />
          </FieldWrapper>
          <FieldWrapper name='shippingPostcode' title='Postcode' messages={this.state.shippingPostcode}>
            <input
              className="input"
              name="shippingPostcode"
              type="text"
              placeholder="TO5 1EG"
              defaultValue={this.props.shippingPostcode}
              onBlur={this.update}
              tabIndex="20"
            />
          </FieldWrapper>
          <FieldWrapper name='shippingCountry' title='Country' messages={this.state.shippingCountry}>
            <Countries
              className="input"
              name="shippingCountry"
              onChange={this.update}
              tabIndex="21"
              value={this.props.shippingCountry}
            />
          </FieldWrapper>
          <h2>Last bits</h2>
          <FieldWrapper name='instructions' title={`Any extra instructions for items or delivery?`} messages={this.state.instructions}>
            <textarea
              className="input"
              name="instructions"
              placeholder=""
              defaultValue={this.props.instructions}
              onBlur={this.update}
              tabIndex="22"
            />
          </FieldWrapper>
          <FieldWrapper name='tandc' title={`have you read and aggreed to our t&c's?`} messages={this.state.tandc}>
            <input
              className="checkbox"
              name="tandc"
              type="checkbox"
              defaultChecked={this.props.tandc}
              onChange={this.update}
              tabIndex="23"
            />
          </FieldWrapper>
        </form>
      </section>
    )
  }
}

export default Billing
