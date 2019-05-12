import { connect } from 'react-redux'
import Payment from '../../components/checkout/payment'

const mapStateToProps = (state, ownProps) => ({
  firstname: state.checkout.firstname,
  lastname: state.checkout.lastname,
  email: state.checkout.email,
  phone: state.checkout.phone,
  billingAddressLine1: state.checkout.billingAddressLine1,
  billingAddressLine2: state.checkout.billingAddressLine2,
  billingAddressLine3: state.checkout.billingAddressLine3,
  billingCity: state.checkout.billingCity,
  billingCounty: state.checkout.billingCounty,
  billingCountry: state.checkout.billingCountry,
  billingPostcode: state.checkout.billingPostcode,
  shippingName: state.checkout.shippingName,
  shippingAddressLine1: state.checkout.shippingAddressLine1,
  shippingAddressLine2: state.checkout.shippingAddressLine2,
  shippingAddressLine3: state.checkout.shippingAddressLine3,
  shippingCity: state.checkout.shippingCity,
  shippingCounty: state.checkout.shippingCounty,
  shippingCountry: state.checkout.shippingCountry,
  shippingPostcode: state.checkout.shippingPostcode,
  tandc: state.checkout.tandc,
  contactTime: state.checkout.contactTime,
  instructions: state.checkout.instructions,
  items: state.cart.items,
  value: state.cart.value
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const PaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment)

export default PaymentContainer
