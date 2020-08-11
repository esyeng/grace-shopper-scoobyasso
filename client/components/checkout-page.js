import React, {Component} from 'react'
// import {fetchCart, modifyCart} from '../store/cart'
import {connect} from 'react-redux'
import {Address} from './address-form'
import {Payment} from './payment-form'
import {placeOrder} from '../store/orders'
import {fetchCart} from '../store/cart'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // isChecked: false
      street: '',
      city: '',
      zip: '',
      state: 'AL',
      country: 'United States',
      ccNum: '',
      cvc: '',
      expDate: '',
      ccZip: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit() {
    const {placeOrder, fetchCart, user} = this.props
    const city = this.state.city
    const zip = this.state.zip
    const state = this.state.state
    const country = this.state.country
    const street = this.state.street
    const checkoutObj = {
      address: {
        city,
        zip,
        state,
        street,
        country
      },
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      },
      payment: {
        ccNum: this.state.ccNum,
        cvc: this.state.cvc,
        expDate: this.state.expDate,
        ccZip: this.state.ccZip
      }
    }
    await placeOrder(checkoutObj).then(() => {
      fetchCart(user.id)
    })
    this.props.history.push('/orderComplete')
  }

  render() {
    return (
      <div>
        <div name="checkbox">
          {/* <label className="isSameAsShip">
            Billing address same as shipping address
            <input
              type="checkbox"
              defaultChecked={this.state.isChecked}
              onChange={this.handleChange}
            />
          </label> */}
        </div>
        <Address
          method="Shipping"
          submit={this.handleSubmit}
          change={this.handleChange}
        />
        <Payment change={this.handleChange} />
        <button onClick={this.handleSubmit}>Place Order</button>
        {/* {this.state.isChecked ? '' : <Address method="Billing" />} */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    placeOrder: object => dispatch(placeOrder(object)),
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
