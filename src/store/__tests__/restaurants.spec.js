import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { RestaurantReducer } from '../reducers';
import { loadRestaurants, createRestaurant } from '../actions';

describe('restaurants reducer', () => {
  describe('initial', () => {
    let store;
    beforeEach(() => {
      store = createStore(RestaurantReducer, applyMiddleware(thunk));
    });
    it('should not have loading flag true', () => {
      expect(store.getState().loading).toEqual(false);
    });
    it('shuld not have error flag true', () => {
      expect(store.getState().error).toEqual(false);
    });
  });

  describe('loadRestaurants action', () => {
    describe('when fetching succeeds', () => {
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
      let store;
      beforeEach(() => {
        const api = {
          loadRestaurants: () => new Promise(() => {}),
        };
        const initialState = { error: true };
        store = createStore(
          RestaurantReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        store.dispatch(loadRestaurants());
      });
      it('should set a loading flag', () => {
        expect(store.getState().loading).toEqual(true);
      });
      it('should clear the error flag', () => {
        expect(store.getState().error).toEqual(false);
      });
    });

    describe('when fetching fails', () => {
      let store;
      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.reject(),
        };
        store = createStore(
          RestaurantReducer,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        store.dispatch(loadRestaurants());
      });

      it('should set an error flag', () => {
        expect(store.getState().error).toEqual(true);
      });

      it('should clear loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });
  });

  describe('createRestaurant action', () => {
    const newRestaurantName = 'Sushi Place';
    const existingRestaurants = [{ id: 1, name: 'Pizza Place' }];
    const responseRestaurant = { id: 2, name: newRestaurantName };
    let api;
    let store;
    let promise;

    beforeEach(() => {
      api = {
        createRestaurant: jest.fn().mockName('createRestaurant'),
      };
      const initialState = {
        records: existingRestaurants,
      };
      store = createStore(
        RestaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );
    });

    it('should save the restaurant to the server', () => {
      api.createRestaurant.mockResolvedValue(responseRestaurant);
      store.dispatch(createRestaurant(newRestaurantName));
      expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
    });

    describe('when save succeeds', () => {
      beforeEach(() => {
        api.createRestaurant.mockResolvedValue(responseRestaurant);
        promise = store.dispatch(createRestaurant(newRestaurantName));
      });

      it('should store returned restaurant into store', () => {
        expect(store.getState().records).toEqual([
          ...existingRestaurants,
          responseRestaurant,
        ]);
      });

      it('should resolve promise', () => expect(promise).resolves.toBeUndefined());
    });
  });
});
