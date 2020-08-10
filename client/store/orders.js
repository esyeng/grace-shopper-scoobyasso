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

//REDUCER

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
