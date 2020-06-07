import { combineReducers } from 'redux';
import RestaurantReducer from './restaurant.reducer';

export default combineReducers({ restaurants: RestaurantReducer });
