import { STORE_RESTAURANTS, SET_LOADING } from '../../constants';

const getRestaurantsAction = payload => ({
  type: STORE_RESTAURANTS,
  payload,
});

export const setLoadingAction = payload => ({
  type: SET_LOADING,
  payload,
});

export const loadRestaurants = () => (dispatch, getState, api) => {
  dispatch(setLoadingAction(true));
  api
    .loadRestaurants()
    .then(records => dispatch(getRestaurantsAction(records)));
};
