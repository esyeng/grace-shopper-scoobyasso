import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return (
      <div>
        {this.props.allProducts.map(product => {
          return (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <div>${product.price}</div>
              <img className="productImage" src={product.imageUrl} />
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
