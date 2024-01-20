import {
  IS_LOADING,
  STORE_DATA,
  IS_ERROR,
  CURRENT_PRODUCT_LOADING,
  CURRENT_PRODUCT_STORE_DATA,
  CURRENT_PRODUCT_ERROR,
} from "./actionTypes";

const initState = {
  loading: false,
  error: false,
  products: [],
  currentProduct: {},
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, loading: true };

    case IS_ERROR:
      return { ...state, loading: false, error: true };

    case STORE_DATA:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };

    case CURRENT_PRODUCT_LOADING:
      return { ...state, loading: true };

    case CURRENT_PRODUCT_ERROR:
      return { ...state, loading: false, error: true };

    case CURRENT_PRODUCT_STORE_DATA:
      return {
        ...state,
        loading: false,
        error: false,
        currentProduct: action.payload,
      };

    default:
      return state;
  }
};

export { productReducer };
