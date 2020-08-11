import React, {Component} from 'react'
import {fetchCart, modifyCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
              <h3 className="itemName">{item.name}</h3>
              <h4 className="cartProduct-image">
                <img src={item.imageUrl} />
              </h4>
              <div className="temp">
                <h5 className="unitPrice">Unit Price - ${item.price / 100}</h5>
                <h6 className="quantity">Quantity - {item.quantity}</h6>
              </div>
              <div className="buttnShift">
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
            </div>
          )
        })}
        <h5 className="cartTotal">Cart Total: ${cartTotal / 100}</h5>
        <div className="chkBtn">
          <Link to={user.id ? `/checkout` : `/login`}>Checkout</Link>
        </div>
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
