import axios from 'axios'

const initialState = []
//action type
const SET_CART = 'SET_CART'

//action creator
const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

//thunk
const fetchCart = userId => {
  return async dispatch => {
    try {
      const cartFetched = await axios.get(`/api/cart/${userId}`)
      dispatch(setCart(cartFetched))
    } catch (err) {
      console.error(err)
    }
  }
}

//reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
