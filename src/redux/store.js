import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { productReducer } from "./products/reducer";
import { thunk } from "redux-thunk";
import { cartReducer } from "./cart/reducer";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
