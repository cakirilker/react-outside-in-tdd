import {
  STORE_RESTAURANTS,
  SET_LOADING,
  SET_ERROR,
  ADD_RESTAURANT,
} from '../../constants';

const initialState = {
  records: [],
  loading: false,
  error: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_RESTAURANTS:
      return { ...state, records: payload, loading: false };
    case ADD_RESTAURANT:
      return { ...state, records: [...state.records, payload] };
    case SET_ERROR:
      return { ...state, loading: false, error: payload };
    case SET_LOADING:
      return { ...state, error: false, loading: payload };
    default:
      return state;
  }
};
