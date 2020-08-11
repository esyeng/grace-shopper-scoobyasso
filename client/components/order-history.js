import React from 'react'
import {connect} from 'react-redux'

const OrderHistory = props => {
  const {orders, user} = props
  return (
    <div>
      <h1>
        Order History for {user.firstName} {user.lastName}
      </h1>
      {orders.map(order => {
        return (
          <div key={order.id}>
            <h2>Order Tracking Number: {order.trackingNumber}</h2>
            <h4>Order Total: ${order.orderTotal}</h4>
            <h4>Purchased on: {order.updatedAt.slice(0, 10)}</h4>
          </div>
        )
      })}
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    orders: state.orders
  }
}

export default connect(mapState)(OrderHistory)
