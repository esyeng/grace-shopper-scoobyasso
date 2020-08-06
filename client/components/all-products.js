import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return (
      <div className="productContainer">
        {this.props.allProducts.map(product => {
          return (
            <div className="productDiv" key={product.id}>
              <div className="productNameDiv">
                <Link className="productName" to={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </div>
              <img className="productImage" src={product.imageUrl} />
              <div className="productPrice">${product.price}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allProducts: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

AllProducts.defaultProps = {allProducts: []}

export default connect(mapState, mapDispatch)(AllProducts)
