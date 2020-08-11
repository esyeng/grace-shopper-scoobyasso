import axios from 'axios'

const initialState = []

//ACTION TYPE
const GET_ORDERS = 'GET_ORDERS'

export const setOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
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
export const placeOrder = object => {
  return async dispatch => {
    try {
      console.log('hello')
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
    default:
      return state
  }
}
