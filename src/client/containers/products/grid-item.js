import { connect } from 'react-redux'
import { addToCart } from '../../actions/cart'
import GridItem from '../../components/products/grid-item'

const mapStateToProps = (state, ownProps) => ({
  items: state.cart.items
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: item => {
    dispatch(addToCart(item))
  }
})

const GridItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridItem)

export default GridItemContainer
