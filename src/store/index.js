import { combineReducers, createStore } from "redux"
import { cartReducer } from "./cartStore"
import { selectedOptionsReducer } from "./selectedOptionsStore"
import { modalAttributesReducer } from "./modalAttributesStore"

const reducer = combineReducers({
  cartReducer,
  selectedOptionsReducer,
  modalAttributesReducer
})

export const store = createStore(reducer)