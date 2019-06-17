import { connect } from 'react-redux'
import Wrapper from '../../components/checkout/wrapper'

const mapStateToProps = (state, ownProps) => ({
  items: state.cart.items,
  isPaid: state.checkout.paid,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const WrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper)

export default WrapperContainer
