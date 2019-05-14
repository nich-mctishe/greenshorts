import { connect } from 'react-redux'
import { addToCart } from '../../actions/cart'
import Product from '../../components/products/single'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: item => {
    dispatch(addToCart(item))
  }
})

const ProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)

export default ProductContainer
