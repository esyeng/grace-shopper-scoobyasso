import axios from 'axios'

const initialState = []

//action type
const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const MODIFY_CART = 'MODIFY_CART'

//action creator
const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

export const addToCart = product => {
  return {
    type: ADD_TO_CART,
    product: {...product, quantity: 1}
  }
}

export const modifyCart = (idx, operation) => {
  return {
    type: MODIFY_CART,
    idx,
    operation
  }
}

//thunk
export const fetchCart = userId => {
  return async dispatch => {
    try {
      const {data: cartFetched} = await axios.get(`/api/cart/${userId}`)
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
    case ADD_TO_CART:
      return [...state, action.product]
    case MODIFY_CART:
      const modifiedCart = [...state]
      if (action.operation === 'plus') {
        modifiedCart[action.idx].quantity += 1
      }
      if (action.operation === 'minus') {
        modifiedCart[action.idx].quantity -= 1
      }
      if (action.operation === 'remove') {
        modifiedCart.splice(action.idx, 1)
      }
      return modifiedCart
    default:
      return state
  }
}
