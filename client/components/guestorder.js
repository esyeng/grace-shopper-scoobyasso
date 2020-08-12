import React from 'react'
import {connect} from 'react-redux'

function randomNum(min, max) {
  return Math.floor(min + (max - min) * Math.random())
}

const GuestOrder = props => {
  const trackingNum = randomNum(1000, 100000)
  return (
    <div className="orderComplete">
      <h1>Thank you for giving us money</h1>
      <h2>Order Tracking Number: {trackingNum}</h2>
      <h3>Order Total: ${randomNum(1, 1000) / 100}</h3>
    </div>
  )
}

export default connect(null)(GuestOrder)
