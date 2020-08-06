import React, {Component} from 'react'
import {fetchCart} from '../store/cart'
import {connect} from 'react-redux'

export class Cart extends Component {
  componentDidMount() {
    this.props.getCart(1)
  }
  render() {
    return (
      <div>
        <h1>{this.props.cart.userId}</h1>
        <h1>HELLO FROM CART</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: id => dispatch(fetchCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
