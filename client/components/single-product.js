import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }
  render() {
    const {singleProduct, addToCart} = this.props
    return (
      <div className="singleProductContainer">
        <h1>{singleProduct.name}</h1>
        <h2>${singleProduct.price / 100}</h2>
        <div className="singleProductStock">
          In Stock: {singleProduct.inventory}
        </div>
        <div className="singleProductDesc">{singleProduct.description}</div>
        <img className="productImage" src={singleProduct.imageUrl} />
        <button
          onClick={() => {
            addToCart(singleProduct)
          }}
        >
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToCart: product => dispatch(addToCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
