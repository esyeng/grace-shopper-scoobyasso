import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {modifyCart} from '../store/cart'
import cart from './cart'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }
  render() {
    const {singleProduct, modifyCart, cart, history, user} = this.props
    return (
      <div className="row">
        <div className="singleProductContainer">
          <h1>{singleProduct.name}</h1>
          <h2>${singleProduct.price / 100}</h2>
          <div className="singleProductStock">
            In Stock: {singleProduct.inventory}
          </div>
          <div className="singleProductDesc">{singleProduct.description}</div>
          <img className="singleProductImage" src={singleProduct.imageUrl} />
          <br />
          <button
            className="addToCart"
            onClick={() => {
              if (user.id) {
                modifyCart(singleProduct, 'addToCart', user.id)
              } else {
                modifyCart(singleProduct, 'addToCart')
              }
              history.push('/cart')
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    singleProduct: state.singleProduct,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    modifyCart: (product, operation, userId) =>
      dispatch(modifyCart(product, operation, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
