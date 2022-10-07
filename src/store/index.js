import { combineReducers, createStore } from "redux"
import { cartReducer } from "./cartStore"
import { selectedOptionsReducer } from "./selectedOptionsStore"

const reducer = combineReducers({
  cartReducer,
  selectedOptionsReducer,
})

export const store = createStore(reducer)