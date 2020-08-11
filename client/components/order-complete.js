import React from 'react'
import {connect} from 'react-redux'

const OrderComplete = props => {
  const {orders} = props
  const lastOrder = orders[orders.length - 1]
  if (orders.length > 0) {
    return (
      <div className="orderComplete">
        <h1>Thank you for giving us money</h1>
        <h2>Order Tracking Number: {lastOrder.trackingNumber}</h2>
        <h3>Order Total: ${lastOrder.orderTotal / 100}</h3>
      </div>
    )
  } else {
    return <h1>LOADING UP YOUR ORDER</h1>
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

export default connect(mapState)(OrderComplete)
