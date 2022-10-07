const initialState = {cart: []}


const cartReducer = (state = initialState, action) => {
  let ind
  switch (action.type) {
    case 'ADD_ITEM':
      ind = state.cart.findIndex(item => {
        
        if (item.id === action.payload.id) {
          return item.attributes.every((attribute, i) => {
            const attrInd = action.payload.attributes.findIndex(elem => elem.id === attribute.id)
            return attribute.valueId === action.payload.attributes[attrInd].valueId
          })
        }
        return false
      })

      let newItem = {...action.payload, quantity: 1}

      if (ind !== -1) {
        newItem.quantity += state.cart[ind].quantity
        return {...state, cart: [...state.cart.slice(0, ind), newItem, ...state.cart.slice(ind + 1)]}
      }

      return {...state, cart: [...state.cart, newItem]}
    case 'INCREMENT_ITEM':
      ind = state.cart.findIndex(item => {
        
        if (item.id === action.payload.id) {
          return item.attributes.every((attribute, i) => {
            const attrInd = action.payload.attributes.findIndex(elem => elem.id === attribute.id)
            return attribute.valueId === action.payload.attributes[attrInd].valueId
          })
        }
        return false
      })

      state.cart[ind].quantity += 1

      return {...state, cart: [...state.cart.slice(0, ind), state.cart[ind], ...state.cart.slice(ind + 1)]}
    case 'DECREMENT_ITEM':
      ind = state.cart.findIndex(item => {
        
        if (item.id === action.payload.id) {
          return item.attributes.every((attribute, i) => {
            const attrInd = action.payload.attributes.findIndex(elem => elem.id === attribute.id)
            return attribute.valueId === action.payload.attributes[attrInd].valueId
          })
        }
        return false
      })
      
      if (state.cart[ind].quantity === 1) {
        return {...state, cart: [...state.cart.slice(0, ind), ...state.cart.slice(ind + 1)]}
      }

      state.cart[ind].quantity -= 1

      return {...state, cart: [...state.cart.slice(0, ind), state.cart[ind], ...state.cart.slice(ind + 1)]}
    case 'SET_CART':
      return {...state, cart: [...action.payload]}
    default: 
      return state
  }
}

const addItemAction = (payload) => ({type: 'ADD_ITEM', payload})
const incrementCartItemAction = (payload) => ({type: 'INCREMENT_ITEM', payload})
const decrementCartItemAction = (payload) => ({type: 'DECREMENT_ITEM', payload})
const setCartAction = (payload) => ({type: 'SET_CART', payload})

export {cartReducer, addItemAction, incrementCartItemAction, decrementCartItemAction, setCartAction}