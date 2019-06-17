import { connect } from 'react-redux'
import Success from '../../components/checkout/success'
import { setPaid } from '../../actions/checkout'
import { emptyCart } from '../../actions/cart'

const mapStateToProps = (state, ownProps) => ({
  firstname: state.checkout.firstname,
  lastname: state.checkout.lastname,
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
  items: state.cart.items,
  subtotal: state.cart.value
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setPaid: paid => {
    dispatch(setPaid(paid))
  },
  emptyCart: _ => {
    dispatch(emptyCart())
  }
})

const SuccessContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Success)

export default SuccessContainer
