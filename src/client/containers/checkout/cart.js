import { connect } from 'react-redux'
import { emptyCart, removeFromCart } from '../../actions/cart'
import Cart from '../../components/checkout/cart'

const mapStateToProps = (state, ownProps) => ({
  items: state.cart.items,
  value: state.cart.value
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  empty: () => {
    dispatch(emptyCart())
  },
  remove: item => {
    dispatch(removeFromCart(item))
  }
})

const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

export default CartContainer
