import { connect } from 'react-redux'
import {
  setFirstname,
  setLastname
} from '../../actions/checkout'
import Payment from '../../components/checkout/payment'

const mapStateToProps = (state, ownProps) => ({
  firstname: state.checkout.firstname,
  lastname: state.checkout.lastname,
  email: state.checkout.email,
  phone: state.checkout.phone,
  billingAddressLine1: state.checkout.billingAddressLine1,
  billingAddressLine2: state.checkout.billingAddressLine2,
  billingAddressLine3: state.checkout.billingAddressLine3,
  billingCity: state.checkout.city,
  billingPostcode: state.checkout.postcode,
  shippingName: state.checkout.name,
  shippingAddressLine1: state.checkout.shippingAddressLine1,
  shippingAddressLine2: state.checkout.shippingAddressLine2,
  shippingAddressLine3: state.checkout.shippingAddressLine3,
  shippingCity: state.checkout.city,
  shippingPostcode: state.checkout.postcode,
  shippingIsBilling: state.checkout.shippingIsBilling,
  tandc: state.checkout.tandc,
  contactTime: state.checkout.contactTime,
  items: state.cart.items,
  value: state.cart.value
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFirstname: item => {
    dispatch(setFirstname(item))
  },
  setLastname: item => {
    dispatch(setLastname(item))
  }
})

const PaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment)

export default PaymentContainer