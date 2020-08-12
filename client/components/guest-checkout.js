import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Address} from './address-form'
import {Payment} from './payment-form'

class GuestCheckout extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit() {
    this.props.history.push('/g-order')
  }

  render() {
    return (
      <div className="checkout">
        <Address method="Shipping" submit={this.handleSubmit} />
        <Payment />
        <button className="loginBtn" onClick={this.handleSubmit}>
          Place Order
        </button>
        {/* {this.state.isChecked ? '' : <Address method="Billing" />} */}
      </div>
    )
  }
}

// const mapState = state => {
//   return {
//     user: state.user
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     placeOrder: object => dispatch(placeOrder(object)),
//     fetchCart: userId => dispatch(fetchCart(userId))
//   }
// }

export default connect(null)(GuestCheckout)
