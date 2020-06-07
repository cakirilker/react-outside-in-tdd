import React from 'react';
import { render } from '@testing-library/react';
import { RestaurantList } from '../RestaurantList';

describe('RestaurantList', () => {
  it('should load restaurants on first render ', () => {
    const loadRestaurants = jest.fn().mockName('loadRestaurants');
    render(
      <RestaurantList loadRestaurants={loadRestaurants} restaurants={[]} />,
    );
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('should display the restaurants', () => {
    const noop = () => {};
    const restaurants = [
      { id: 1, name: 'Sushi Place' },
      { id: 2, name: 'Pizza Place' },
    ];
    const { queryByText } = render(
      <RestaurantList loadRestaurants={noop} restaurants={restaurants} />,
    );

    expect(queryByText('Sushi Place')).not.toBeNull();
    expect(queryByText('Pizza Place')).not.toBeNull();
  });
});
