import React from 'react'

export const Payment = props => {
  const {change} = props
  return (
    <div className="information">
      <form>
        <h1 className="checkoutHead">Payment Information:</h1>
        <div>
          <label htmlFor="ccNum">
            <small className="smallText">Credit Card Number:</small>
          </label>
          <input onChange={change} name="ccNum" type="text" />
        </div>
        <div>
          <label htmlFor="cvc">
            <small className="smallText">CVC:</small>
          </label>
          <input onChange={change} name="cvc" type="text" />
        </div>
        <div>
          <label htmlFor="expDate">
            <small className="smallText">Expiration Date:</small>
          </label>
          <input onChange={change} name="expDate" type="text" />
        </div>
        <div>
          <label htmlFor="ccZip">
            <small className="smallText">ZIP code:</small>
          </label>
          <input onChange={change} name="ccZip" type="text" />
        </div>
      </form>
    </div>
  )
}
