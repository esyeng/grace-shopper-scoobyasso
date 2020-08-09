import React, {Component} from 'react'
import {fetchCart, modifySessionCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    let cartTotal = 0
    const {modifySessionCart, user} = this.props
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
                  if (user.id) {
                    modifySessionCart(item, 'increase', user.id)
                  } else {
                    modifySessionCart(item, 'increase')
                  }
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    if (user.id) {
                      modifySessionCart(item, 'decrease', user.id)
                    } else {
                      modifySessionCart(item, 'decrease')
                    }
                  }
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  if (user.id) {
                    modifySessionCart(item, 'removeFromCart', user.id)
                  } else {
                    modifySessionCart(item, 'removeFromCart')
                  }
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
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: id => dispatch(fetchCart(id)),
    modifySessionCart: (product, operation, userId) =>
      dispatch(modifySessionCart(product, operation, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
