import { combineReducers } from 'redux';
import {
  STORE_RESTAURANTS,
  SET_LOADING,
  SET_ERROR,
  ADD_RESTAURANT,
} from '../../constants';

const records = (state = [], { type, payload }) => {
  switch (type) {
    case STORE_RESTAURANTS:
      return payload;
    case ADD_RESTAURANT:
      return [...state, payload];
    default:
      return state;
  }
};

const loading = (state = false, { type, payload }) => {
  switch (type) {
    case STORE_RESTAURANTS:
    case SET_ERROR:
      return false;
    case SET_LOADING:
      return payload;
    default:
      return state;
  }
};

const error = (state = false, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      return payload;
    case SET_LOADING:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  records,
  loading,
  error,
});

// import { STORE_RESTAURANTS, SET_LOADING, SET_ERROR } from '../../constants';

// let initialState = {
//   records: [],
//   loading: false,
//   error: false,
// };

// const state = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case STORE_RESTAURANTS:
//       return {
//         ...state,
//         records: payload,
//         loading: false,
//       };
//     case SET_LOADING:
//       return {
//         ...state,
//         loading: true,
//         error: false,
//       };
//     case SET_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: true,
//       };
//     default:
//       return initialState;
//   }
// };

// export default state;
