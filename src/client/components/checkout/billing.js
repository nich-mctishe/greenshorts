import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FieldWrapper from '../partials/field-wrapper'

import { upperFirst } from 'lodash'

import validate from '../../lib/validation'

const fields = {
  firstname: 'required',
  lastname: 'required',
  email: 'required|email',
  phone: 'required|phone',
  billingAddressLine1: 'required',
  billingAddressLine2: 'required',
  billingAddressLine3: 'required',
  billingCity: 'required',
  billingPostcode: 'required',
  shippingName: 'required',
  shippingAddressLine1: 'required',
  shippingAddressLine2: 'required',
  shippingAddressLine3: 'required',
  shippingCity: 'required',
  shippingPostcode: 'required',
  shippingIsBilling: 'required|bool',
  tandc: 'required|bool',
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
    billingPostcode: PropTypes.string,
    shippingName: PropTypes.string,
    shippingAddressLine1: PropTypes.string,
    shippingAddressLine2: PropTypes.string,
    shippingAddressLine3: PropTypes.string,
    shippingCity: PropTypes.string,
    shippingPostcode: PropTypes.string,
    shippingIsBilling: PropTypes.bool,
    tandc: PropTypes.bool,
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
    billingPostcode: null,
    shippingName: null,
    shippingAddressLine1: null,
    shippingAddressLine2: null,
    shippingAddressLine3: null,
    shippingCity: null,
    shippingPostcode: null,
    shippingIsBilling: null,
    tandc: null,
    contactTime: null
  }

  update = (event) => {
    const valid = validate(fields, event.target.name, event.target.value || event.target.checked)
    let stateToUpdate = {}
    stateToUpdate[event.target.name] = null

    if (!!this.props[`set${upperFirst(event.target.name)}`]) {
      if (valid.success) {
        this.setState(stateToUpdate)

        return this.props[`set${upperFirst(event.target.name)}`](event.target.value || event.target.checked)
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
          <FieldWrapper name='billingAddressLine1' title='Billing Address Line 1' messages={this.state.billingAddressLine1}>
            <input
              className="input"
              name="billingAddressLine1"
              type="text"
              placeholder="123 street lane"
              defaultValue={this.props.billingAddressLine1}
              onBlur={this.update}
            />
          </FieldWrapper>
          <FieldWrapper name='shippingAddressLine1' title='Shipping Address Line 1' messages={this.state.shippingAddressLine1}>
            <input
              className="input"
              name="shippingAddressLine1"
              type="text"
              placeholder="124 street lane"
              defaultValue={this.props.shippingAddressLine1}
              onBlur={this.update}
            />
          </FieldWrapper>
        </form>
      </section>
    )
  }
}

export default Billing


// <div className="form--initial-details">
//   <Field title="First Name" name="firstname">
//     <input
//       type='text'
//       name='firstname'
//       placeholder='jane'
//       defaultValue={this.state.firstname}
//       onBlur={this.update}
//       />
//   </Field>
//   <Field
//     title="Last Name"
//     name="lastname"
//     type="text"
//     placeholder="Doe"
//     value={this.state.lastname}
//     onBlur={this.update}
//     />
//   <Field
//     title="Email"
//     name="email"
//     type="email"
//     placeholder="jane.doe@rashaswais.com"
//     value={this.state.email}
//     onBlur={this.update}
//     />
//   <Field
//     title="Phone"
//     name="phone"
//     type="tel"
//     placeholder="01234567890"
//     value={this.state.phone}
//     onBlur={this.update}
//     />
//   <Field
//     title="When is best to contact you?"
//     name="contactTime"
//     type="text"
//     placeholder="Between 4pm and 4:02pm on a Thursday"
//     value={this.state.contactTime}
//     onBlur={this.update}
//     />
//   </div>
//   <div className="form--billing">
//     <Field title="Address Line 1" name="billingAddressLine1">
//       <input
//         type='text'
//         name='billingAddressLine1'
//         placeholder='123 Street Lane'
//         defaultValue={this.state.billingAddressLine1}
//         onBlur={this.update}
//         />
//     </Field>
//     <Field
//       title="Address Line 2"
//       name="billingAddressLine2"
//       type="text"
//       placeholder=""
//       value={this.state.billingAddressLine2}
//       onBlur={this.update}
//       />
//     <Field
//       title="Address Line 3"
//       name="billingAddressLine3"
//       type="text"
//       placeholder=""
//       value={this.state.billingAddressLine3}
//       onBlur={this.update}
//       />
//     <Field
//       title="City"
//       name="billingCity"
//       type="text"
//       placeholder="Townington"
//       value={this.state.billingCity}
//       onBlur={this.update}
//       />
//     <Field
//       title="Postcode"
//       name="billingPostcode"
//       type="text"
//       placeholder="TO1 3TA"
//       value={this.state.billingPostcode}
//       onBlur={this.update}
//       />
//   </div>
//   <div className="form--same-address">
//     <Field title="Use same address as billing?" name="shippingIsBilling">
//       <input
//         type='checkbox'
//         name='shippingIsBilling'
//         defaultChecked={this.state.shippingIsBilling}
//         onBlur={this.update}
//         />
//     </Field>
//   </div>
//   <div className="form--shipping">
//     <Field
//       title="Name"
//       name="shippingName"
//       type="text"
//       placeholder="John Doe"
//       value={this.state.shippingName}
//       onBlur={this.update}
//       />
//     <Field
//       title="Address Line 1"
//       name="shippingAddressLine1"
//       type="text"
//       placeholder='124 Street Lane'
//       value={this.state.shippingAddressLine1}
//       onBlur={this.update}
//       >
//       <input
//         type='text'
//         name='shippingAddressLine1'
//         placeholder='125 Street Lane'
//         defaultValue={(this.state.shippingIsBilling) ? this.state.billingAddressLine1 : this.state.shippingAddressLine1}
//         onBlur={this.update}
//         />
//     </Field>
//
//     <Field
//       title="Address Line 2"
//       name="shippingAddressLine2"
//       type="text"
//       placeholder=""
//       value={this.state.shippingAddressLine2}
//       onBlur={this.update}
//       />
//     <Field
//       title="Address Line 3"
//       name="shippingAddressLine3"
//       type="text"
//       placeholder=""
//       value={this.state.shippingAddressLine3}
//       onBlur={this.update}
//       />
//     <Field
//       title="City"
//       name="shippingCity"
//       type="text"
//       placeholder="Townington"
//       value={this.state.shippingCity}
//       onBlur={this.update}
//       />
//     <Field
//       title="Postcode"
//       name="shippingPostcode"
//       type="text"
//       placeholder="TO1 3TA"
//       value={this.state.shippingPostcode}
//       onBlur={this.update}
//       />
//   </div>
//   <div className="form--tandc">
//     <Field
//       title="Check to confirm you have read our terms and conditions"
//       name="tandc"
//       type="checkbox"
//       value={this.state.tandc}
//       onBlur={this.update}
//     />
//   </div>
