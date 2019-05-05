import { connect } from 'react-redux'
import {
  setFirstname,
  setLastname,
  setPhone,
  setEmail,
  setContactTime,
  setBillingLine1,
  setBillingLine2,
  setBillingLine3,
  setBillingCity,
  setBillingCounty,
  setBillingPostcode,
  setSameAddress,
  setShippingName,
  setShippingLine1,
  setShippingLine2,
  setShippingLine3,
  setShippingCity,
  setShippingCounty,
  setShippingPostcode,
  setReadTandc,
  setInstructions
} from '../../actions/checkout'
import Billing from '../../components/checkout/billing'

const mapStateToProps = (state, ownProps) => ({
  firstname: state.checkout.firstname,
  lastname: state.checkout.lastname,
  email: state.checkout.email,
  phone: state.checkout.phone,
  billingAddressLine1: state.checkout.billingAddressLine1,
  billingAddressLine2: state.checkout.billingAddressLine2,
  billingAddressLine3: state.checkout.billingAddressLine3,
  billingCity: state.checkout.city,
  billingCounty: state.checkout.billingCounty,
  billingPostcode: state.checkout.postcode,
  shippingName: state.checkout.name,
  shippingAddressLine1: state.checkout.shippingAddressLine1,
  shippingAddressLine2: state.checkout.shippingAddressLine2,
  shippingAddressLine3: state.checkout.shippingAddressLine3,
  shippingCity: state.checkout.city,
  shippingCounty: state.checkout.shippingCounty,
  shippingPostcode: state.checkout.postcode,
  shippingIsBilling: state.checkout.shippingIsBilling,
  tandc: state.checkout.tandc,
  contactTime: state.checkout.contactTime,
  instructions: state.checkout.instructions
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFirstname: item => {
    dispatch(setFirstname(item))
  },
  setLastname: item => {
    dispatch(setLastname(item))
  },
  setPhone: item => {
    dispatch(setPhone(item))
  },
  setEmail: item => {
    dispatch(setEmail(item))
  },
  setContactTime: item => {
    dispatch(setContactTime(item))
  },
  setBillingAddressLine1: item => {
    dispatch(setBillingLine1(item))
  },
  setBillingAddressLine2: item => {
    dispatch(setBillingLine2(item))
  },
  setBillingAddressLine3: item => {
    dispatch(setBillingLine3(item))
  },
  setBillingCity: item => {
    dispatch(setBillingCity(item))
  },
  setBillingCounty: item => {
    dispatch(setBillingCounty(item))
  },
  setBillingPostcode: item => {
    dispatch(setBillingPostcode(item))
  },
  setShippingIsBilling: item => {
    dispatch(setSameAddress(item))
  },
  setShippingName: item => {
    dispatch(setShippingName(item))
  },
  setShippingAddressLine1: item => {
    dispatch(setShippingLine1(item))
  },
  setShippingAddressLine2: item => {
    dispatch(setShippingLine2(item))
  },
  setShippingAddressLine3: item => {
    dispatch(setShippingLine3(item))
  },
  setShippingCity: item => {
    dispatch(setShippingCity(item))
  },
  setShippingCounty: item => {
    dispatch(setShippingCounty(item))
  },
  setShippingPostcode: item => {
    dispatch(setShippingPostcode(item))
  },
  setTandc: item => {
    dispatch(setReadTandc(item))
  },
  setInstructions: item => {
    dispatch(setInstructions(item))
  }
})

const BillingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing)

export default BillingContainer
