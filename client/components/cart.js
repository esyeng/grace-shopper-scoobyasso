import React, {Component} from 'react'
import {fetchCart, modifyCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    let cartTotal = 0
    const {modifyCart, user} = this.props
    return (
      <div className="cartDiv">
        {this.props.cart.map((item, idx) => {
          cartTotal += item.quantity * item.price
          return (
            <div className="cartProduct" key={item.id}>
              <h3>{item.name}</h3>
              <img className="cartProduct-image" src={item.imageUrl} />
              <h5>Unit Price - ${item.price / 100}</h5>
              <h5>Quantity - {item.quantity}</h5>
              <button
                onClick={() => {
                  if (user.id) {
                    modifyCart(item, 'increase', user.id)
                  } else {
                    modifyCart(item, 'increase')
                  }
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    if (user.id) {
                      modifyCart(item, 'decrease', user.id)
                    } else {
                      modifyCart(item, 'decrease')
                    }
                  }
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  if (user.id) {
                    modifyCart(item, 'removeFromCart', user.id)
                  } else {
                    modifyCart(item, 'removeFromCart')
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
    modifyCart: (product, operation, userId) =>
      dispatch(modifyCart(product, operation, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
