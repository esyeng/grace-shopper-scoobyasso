import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(1)
  }
  render() {
    const {singleProduct} = this.props
    return (
      <div className="singleProductContainer">
        {/* <img className="productImage" src={singleProduct.imageUrl} /> */}
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
