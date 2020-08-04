import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct()
  }
  render() {
    const {product} = this.props
    const {name, description, imageUrl, price, category} = product
    return (
      <div>
        <div className="single-container">
          <h3 className="product-name">{name}</h3>
          <p className="product-desc">{description}</p>
          <img className="product-img" src={imageUrl} />
          <h5 className="category">{category}</h5>
          <h4>
            <small className="price">${price}</small>
          </h4>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: () => dispatch(fetchSingleProduct())
  }
}

SingleProduct.defaultProps = {product: {}}

export default connect(mapState, mapDispatch)(SingleProduct)
