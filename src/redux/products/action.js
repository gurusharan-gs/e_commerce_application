import {
  IS_LOADING,
  STORE_DATA,
  IS_ERROR,
  CURRENT_PRODUCT_LOADING,
  CURRENT_PRODUCT_STORE_DATA,
  CURRENT_PRODUCT_ERROR,
} from "./actionTypes";

const handleLoading = () => ({
  type: IS_LOADING,
});

const handleERROR = () => {
  type: IS_ERROR;
};

const storeData = (payload) => ({
  type: STORE_DATA,
  payload,
});

const getData = () => (dispatch) => {
  dispatch(handleLoading());
  fetch(`http://localhost:8000/products`)
    .then((res) => res.json())
    .then((res) => dispatch(storeData(res)))
    .catch((err) => dispatch(handleERROR()));
};

const handleCurrentProductLoading = () => ({
  type: CURRENT_PRODUCT_LOADING,
});

const handleCurrentProductERROR = () => {
  type: CURRENT_PRODUCT_ERROR;
};

const storeCurrentProductData = (payload) => ({
  type: CURRENT_PRODUCT_STORE_DATA,
  payload,
});

const getCurrentProductData = (id) => (dispatch) => {
  dispatch(handleCurrentProductLoading(id));
  fetch(`http://localhost:8000/products/${id}`)
    .then((res) => res.json())
    .then((res) => dispatch(storeCurrentProductData(res)))
    .catch((err) => dispatch(handleCurrentProductERROR()));
};
export { getData, getCurrentProductData };
