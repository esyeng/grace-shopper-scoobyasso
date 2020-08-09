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
    product
  }
}

//thunk
export const fetchCart = userId => {
  return async dispatch => {
    try {
      const {data: cartFetched} = await axios.get(
        `/api/cart/${userId ? userId : 'guest'}`
      )
      console.log(cartFetched)
      dispatch(setCart(cartFetched))
    } catch (err) {
      console.error(err)
    }
  }
}

export const modifySessionCart = (product, operation, userId) => {
  return async dispatch => {
    try {
      const requestChange = {
        product: {...product, quantity: 1},
        operation,
        userId
      }
      const {data: modifiedCart} = await axios.put(
        `/api/cart/${userId ? userId : 'guest'}`,
        requestChange
      )

      dispatch(setCart(modifiedCart))
    } catch (error) {
      console.error(error)
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
