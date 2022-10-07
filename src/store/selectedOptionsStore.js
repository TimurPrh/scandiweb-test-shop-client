const initialState = {category: undefined, currency: {label: '', symbol: ''}, isVisibleOverlay: false, isVisibleCart: false}

const selectedOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return {...state, category: action.payload}
    case 'CHANGE_CURRENCY':
      return {...state, currency: action.payload}
    case 'CHANGE_OVERLAY_VISIBLE':
      return {...state, isVisibleOverlay: action.payload}
    case 'CHANGE_CART_VISIBLE':
      return {...state, isVisibleCart: action.payload}
    default: 
      return state
  }
}

const changeCategoryAction = (payload) => ({type: 'CHANGE_CATEGORY', payload})
const changeCurrencyAction = (payload) => ({type: 'CHANGE_CURRENCY', payload})
const changeOverlayVisibleAction = (payload) => ({type: 'CHANGE_OVERLAY_VISIBLE', payload})
const changeCartVisibleAction = (payload) => ({type: 'CHANGE_CART_VISIBLE', payload})

export {selectedOptionsReducer, changeCategoryAction, changeCurrencyAction, changeOverlayVisibleAction, changeCartVisibleAction}