import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct()
  }
  render() {
    return (
      <div className="singleProductContainer">
        {this.props.singleProduct(product => {
          return (
            <div className="singleProductDiv" key={product.id}>
              <h1 className="productName">{product.name}</h1>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.product
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: () => dispatch(fetchSingleProduct())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
