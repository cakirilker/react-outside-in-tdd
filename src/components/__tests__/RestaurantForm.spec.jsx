import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';
import { RestaurantForm } from '../RestaurantForm';

describe('RestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  let createRestaurant;
  let context;
  beforeEach(() => {
    createRestaurant = jest.fn().mockName('createRestaurant');
    context = render(<RestaurantForm createRestaurant={createRestaurant} />);
  });

  describe('initially', () => {
    it('should not display a validation error', () => {
      const { queryByText } = context;
      expect(queryByText(requiredError)).toBeNull();
    });
  });

  describe('when filled in', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      const { getByTestId, getByPlaceholderText } = context;
      await userEvent.type(
        getByPlaceholderText('Restaurant Name'),
        restaurantName,
      );
      userEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('should call createRestaurant with the name', () => {
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('should clear the name', () => {
      const { getByPlaceholderText } = context;
      expect(getByPlaceholderText('Restaurant Name').value).toEqual('');
    });

    it('should hide validation error', () => {
      const { queryByText } = context;
      expect(queryByText(requiredError)).toBeNull();
    });
  });

  describe('when empty', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      const { getByPlaceholderText, getByTestId } = context;
      await userEvent.type(getByPlaceholderText('Restaurant Name'), '');
      userEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('displays a validation error', () => {
      const { queryByText } = context;
      expect(queryByText(requiredError)).not.toBeNull();
    });

    it('does not call createRestaurant', () => {
      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe('when correcting a validation error after invalid submit', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      const { getByPlaceholderText, getByTestId } = context;

      await userEvent.type(getByPlaceholderText('Restaurant Name'), '');
      userEvent.click(getByTestId('new-restaurant-submit-button'));

      await userEvent.type(
        getByPlaceholderText('Restaurant Name'),
        restaurantName,
      );
      userEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('clears the validation error', () => {
      const { queryByText } = context;
      expect(queryByText(requiredError)).toBeNull();
    });
  });
});
