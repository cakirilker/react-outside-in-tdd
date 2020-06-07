import React, { useEffect } from 'react';

export const RestaurantList = ({ loadRestaurants }) => {
  useEffect(() => {
    loadRestaurants();
  }, []);
  return <div>Restaurant List</div>;
};

export default RestaurantList;
