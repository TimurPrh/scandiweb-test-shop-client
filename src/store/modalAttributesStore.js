const initialState = {product: {}, isVisibleModal: false, productsListOffset: 0, productScrollTop: 0}

const modalAttributesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MODAL_PRODUCT':
      return {...state, product: action.payload}
    case 'CHANGE_MODAL_VISIBLE':
      return {...state, isVisibleModal: action.payload}
    case 'CHANGE_LIST_OFFSET':
      return {...state, productsListOffset: action.payload}
    case 'CHANGE_PRODUCT_SCROLL_TOP':
      return {...state, productScrollTop: action.payload}
    default: 
      return state
  }
}

const changeModalProductAction = (payload) => ({type: 'CHANGE_MODAL_PRODUCT', payload})
const changeModalVisibleAction = (payload) => ({type: 'CHANGE_MODAL_VISIBLE', payload})
const changeListOffsetAction = (payload) => ({type: 'CHANGE_LIST_OFFSET', payload})
const changeProductScrollTopAction = (payload) => ({type: 'CHANGE_PRODUCT_SCROLL_TOP', payload})

export {modalAttributesReducer, changeModalProductAction, changeModalVisibleAction, changeListOffsetAction, changeProductScrollTopAction}