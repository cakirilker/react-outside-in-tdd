import { combineReducers } from 'redux';
import { GET_RESTAURANTS } from '../../constants';

const records = (state = [], { type, payload }) => {
  switch (type) {
    case GET_RESTAURANTS:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  records,
});
