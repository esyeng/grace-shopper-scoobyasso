import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }
  render() {
    const {singleProduct} = this.props
    return (
      <div className="singleProductContainer">
        <h1>{singleProduct.name}</h1>
        <h2>${singleProduct.price}</h2>
        <div className="singleProductStock">
          In Stock: {singleProduct.inventory}
        </div>
        <div className="singleProductDesc">{singleProduct.description}</div>
        <img className="productImage" src={singleProduct.imageUrl} />
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
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
