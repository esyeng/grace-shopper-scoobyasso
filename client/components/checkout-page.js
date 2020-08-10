import React, {Component} from 'react'
// import {fetchCart, modifyCart} from '../store/cart'
import {connect} from 'react-redux'
import Address from './address-form'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  render() {
    return (
      <div>
        <div name="checkbox">
          <label className="isSameAsShip">
            same as shipping address
            <input
              type="checkbox"
              defaultChecked={this.state.isChecked}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <Address method="Shipping" />
        {this.state.isChecked ? '' : <Address method="Billing" />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    method: state.method
  }
}
const mapDispatch = dispatch => {
  return {
    //
  }
}

export default connect(mapState, mapDispatch)(Checkout)
