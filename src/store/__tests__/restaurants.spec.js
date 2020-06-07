import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { RestaurantReducer } from '../reducers';
import { loadRestaurants } from '../actions';

describe('restaurants reducer', () => {
  describe('initial', () => {
    it('should not have loading flag true', () => {
      const store = createStore(RestaurantReducer, applyMiddleware(thunk));
      expect(store.getState().loading).toEqual(false);
    });
  });

  describe('loadRestaurants action', () => {
    describe('when loading ends', () => {
      const records = [
        { id: 1, name: 'Sushi Place' },
        { id: 2, name: 'Pizza Place' },
      ];
      let store;
      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.resolve(records),
        };

        store = createStore(
          RestaurantReducer,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurants());
      });

      it('should store the restaurants', () => {
        expect(store.getState().records).toEqual(records);
      });

      it('should clear loading flag upon storing', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });

    describe('while loading', () => {
      it('should set a loading flag', () => {
        const api = {
          loadRestaurants: () => new Promise(() => {}),
        };
        const store = createStore(
          RestaurantReducer,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        store.dispatch(loadRestaurants());
        expect(store.getState().loading).toEqual(true);
      });
    });
  });
});
