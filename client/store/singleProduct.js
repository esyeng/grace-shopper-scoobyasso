import axios from 'axios'

const initialState = {}
//ACTION TYPES
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//ACTION CREATOR
export const setSingleProduct = product => ({
  type: SET_SINGLE_PRODUCT,
  product
})

export const deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})
export const updateSingleProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})
//THUNK
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      console.log('running THUNK @@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      const {data: productFetched} = await axios.get(`/api/products/1`)
      console.log(productFetched)
      dispatch(setSingleProduct(productFetched))
    } catch (error) {
      console.error(error)
    }
  }
}
// export const fetchDeleteProduct = (id) => {
//     return async function(dispatch) {
//         try {
//             const{ data: }
//         } catch (error) {

//         }
//     }
// }

export default function productReducer(state = initialState, action) {
  switch (action.types) {
    case SET_SINGLE_PRODUCT:
      console.log('INSIDE REDUCER@@@@@@@', action.product)
      return action.product
    case UPDATE_PRODUCT:
      return {
        ...state,
        name: action.product.name,
        description: action.product.description,
        price: action.product.price
      } ///Later on add imageUrl and Category
    case DELETE_PRODUCT:
      return [...state.filter(item => item.id !== action.id)]
    default:
      return state
  }
}
