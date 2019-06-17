
// this could go in lib as a helper.
export function formatItem(props, state, quantity) {
  return {
    product: {
      _id: props._id || null,
      sku: props.sku || null,
      name: props.name || props.Name || null
    },
    quantity: quantity,
    size: state.size,
    price: Number(props.price),
    'total-cost': Number(props.price) * Number(quantity)
  }
}
