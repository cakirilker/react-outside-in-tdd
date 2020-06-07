import { GET_RESTAURANTS } from '../../constants';

const getRestaurantsAction = payload => ({
  type: GET_RESTAURANTS,
  payload,
});

export const loadRestaurants = () => (dispatch, getState, api) => {
  api
    .loadRestaurants()
    .then(records => dispatch(getRestaurantsAction(records)));
};
