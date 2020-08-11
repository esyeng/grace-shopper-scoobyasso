import axios from 'axios'

const initialState = []

//ACTION TYPE
const GET_ORDERS = 'GET_ORDERS'
const PLACE_ORDER = 'PLACE_ORDER'

export const setOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

export const orderPlace = order => {
  return {
    type: PLACE_ORDER,
    order
  }
}
//THUNK

//FETCHORDER THUNK WILL BE FOR GRABBING ORDER HISTORY
export const fetchOrder = userId => {
  return async dispatch => {
    try {
      const {data: orderData} = await axios.get(`/api/orders/${userId}`)
      dispatch(setOrders(orderData))
    } catch (error) {
      console.error(error)
    }
  }
}

// PLACEORDER THUNK FOR UPDATING ORDER WITH BILL/SHIP ADDRESS
// IT WILL TAKE IN AN OBJECT WITH ADDRESS FORM DATA AND USER ID/FIRST/LASTNAME
// AS KEY VALUE PAIRS
export const placeOrder = checkoutObj => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/checkout`, checkoutObj)
      dispatch(orderPlace(data.completedOrder))
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case PLACE_ORDER:
      return [...state, action.order]
    default:
      return state
  }
}
