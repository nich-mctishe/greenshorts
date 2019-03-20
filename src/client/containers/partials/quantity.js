import { connect } from 'react-redux'
import { updateQuantity } from '../../actions/cart'
import Quantity from '../../components/partials/quantity'

const mapStateToProps = (state, ownProps) => ({
  items: state.cart.items
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateQuantity: item => {
    dispatch(updateQuantity(item))
  }
})

const QuantityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Quantity)

export default QuantityContainer
