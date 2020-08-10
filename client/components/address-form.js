import React from 'react'
import {connect} from 'react-redux'

class Address extends Component {
  render() {
    return (
      <div>
        <h1 className="checkoutHead">Shipping Address:</h1>
        <div>
          <label htmlFor="street">
            <small className="smallText">Street Address:</small>
          </label>
          <input name="street" type="text" />
        </div>
        <div>
          <label htmlFor="city">
            <small className="smallText">City:</small>
          </label>
          <input name="city" tpye="text" />
        </div>
      </div>
    )
  }
}
