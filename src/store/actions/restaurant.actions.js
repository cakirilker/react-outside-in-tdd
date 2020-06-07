import {
  STORE_RESTAURANTS,
  SET_LOADING,
  SET_ERROR,
  ADD_RESTAURANT,
} from '../../constants';

export const getRestaurantsAction = payload => ({
  type: STORE_RESTAURANTS,
  payload,
});

export const setLoadingAction = payload => ({
  type: SET_LOADING,
  payload,
});

export const setErrorAction = payload => ({
  type: SET_ERROR,
  payload,
});

export const addRestaurantAction = payload => ({
  type: ADD_RESTAURANT,
  payload,
});

export const loadRestaurants = () => (dispatch, getState, api) => {
  dispatch(setLoadingAction(true));
  api
    .loadRestaurants()
    .then(records => dispatch(getRestaurantsAction(records)))
    .catch(() => {
      dispatch(setErrorAction(true));
    });
};

export const createRestaurant = name => (dispatch, getState, api) =>
  api.createRestaurant(name).then(record => {
    dispatch(addRestaurantAction(record));
  });
