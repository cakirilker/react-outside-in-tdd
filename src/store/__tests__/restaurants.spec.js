import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { RestaurantReducer } from '../reducers';
import { loadRestaurants } from '../actions';

describe('restaurants reducer', () => {
  describe('loadRestaurants action', () => {
    it('should store the restaurants', async () => {
      const records = [
        { id: 1, name: 'Sushi Place' },
        { id: 2, name: 'Pizza Place' },
      ];

      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      const store = createStore(
        RestaurantReducer,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      await store.dispatch(loadRestaurants());
      expect(store.getState().records).toEqual(records);
    });
  });
});
