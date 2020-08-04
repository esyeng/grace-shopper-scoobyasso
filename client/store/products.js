import axios from 'axios'

const initialState = []
//ACTION TYPE
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
//ACTION CREATOR
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}
// export const addProducts = (products) => {
//     return {
//         type: ADD_PRODUCTS,
//         products
//     }
// }
//THUNK

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data: productData} = await axios.get('/api/products')
      dispatch(setProducts(productData))
    } catch (error) {
      console.error(error)
    }
  }
}

///If necessary, add in addProducts

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCTS:
      return [...state, action.products]
    default:
      return state
  }
}
