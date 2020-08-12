import React from 'react'
import {connect} from 'react-redux'

const OrderHistory = props => {
  const {orders, user} = props
  return (
    <div className="orderHistory">
      <div className="orderHistoryDiv">
        <h1>
          Order History for: {user.firstName} {user.lastName}
        </h1>
      </div>
      {orders.map(order => {
        return (
          <div className="orderInfo" key={order.id}>
            <h2 className="tracking">
              Order Tracking Number: {order.trackingNumber}
            </h2>
            <h4 className="orderTotal">
              Order Total: ${order.orderTotal / 100}
            </h4>
            <h4 className="orderDate">
              Purchased on: {order.updatedAt.slice(0, 10)}
            </h4>
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
