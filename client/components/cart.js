import React, {Component} from 'react'
import {fetchCart, modifyCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    let cartTotal = 0
    const {modifyCart} = this.props
    return (
      <div>
        {this.props.cart.map((item, idx) => {
          cartTotal += item.quantity * item.price
          return (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <img src={item.imageUrl} />
              <h5>Unit Price - ${item.price / 100}</h5>
              <h5>Quantity - {item.quantity}</h5>
              <button
                onClick={() => {
                  modifyCart(idx, 'plus')
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    modifyCart(idx, 'minus')
                  }
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  modifyCart(idx, 'remove')
                }}
              >
                Remove Item From Cart
              </button>
            </div>
          )
        })}
        <h5>Cart Total: ${cartTotal / 100}</h5>
        <button>Checkout</button>
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
    getCart: id => dispatch(fetchCart(id)),
    modifyCart: (idx, operation) => dispatch(modifyCart(idx, operation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
