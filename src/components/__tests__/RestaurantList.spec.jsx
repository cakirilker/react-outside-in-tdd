import React from 'react';
import { render } from '@testing-library/react';
import { RestaurantList } from '../RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    { id: 1, name: 'Sushi Place' },
    { id: 2, name: 'Pizza Place' },
  ];
  let loadRestaurants;
  let context;

  const renderWithProps = props => {
    loadRestaurants = jest.fn().mockName('loadRestaurants');
    context = render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
        loading={false}
        {...props}
      />,
    );
  };

  it('should load restaurants on first render ', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('should display the loading indicator while loading', () => {
    renderWithProps({ loading: true });
    const { queryByTestId } = context;
    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });

  describe('when loading succeeds', () => {
    beforeEach(() => {
      renderWithProps();
    });

    it('should not display the loading indicator while not loading', () => {
      const { queryByTestId } = context;
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    it('should display the restaurants', () => {
      const { queryByText } = context;
      expect(queryByText('Sushi Place')).not.toBeNull();
      expect(queryByText('Pizza Place')).not.toBeNull();
    });
  });
});
