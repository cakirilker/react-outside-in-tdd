import { combineReducers } from 'redux';
import { STORE_RESTAURANTS, SET_LOADING } from '../../constants';

const records = (state = [], { type, payload }) => {
  switch (type) {
    case STORE_RESTAURANTS:
      return payload;
    default:
      return state;
  }
};

const loading = (state = false, { type, payload }) => {
  switch (type) {
    case STORE_RESTAURANTS:
      return false;
    case SET_LOADING:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  records,
  loading,
});
