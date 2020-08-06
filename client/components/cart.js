import React, {Component} from 'react'
import {fetchCart} from '../store/cart'
import {connect} from 'react-redux'

export class Cart extends Component {
  componentDidMount() {
    this.props.getCart(1)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.cart.orderLists.map(item => {
          return (
            <div key={item.id}>
              <h3>{item.product.name}</h3>
              <h5>Unit Price{item.product.price}</h5>
              <h5>Quantity{item.quantity}</h5>
            </div>
          )
        })}
        <h5>${this.props.cart.orderTotal}</h5>
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
