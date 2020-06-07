import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { loadRestaurants } from '../store/actions';

export const RestaurantList = ({
  loadRestaurants,
  restaurants,
  loading,
  error,
}) => {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);
  return (
    <>
      {loading && <CircularProgress data-testid="loading-indicator" />}
      {error && (
        <Alert severity="error">Restaurants could not be loaded.</Alert>
      )}
      <List>
        {restaurants.map(restaurant => (
          <ListItem key={restaurant.id}>
            <ListItemText>{restaurant.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const mapStateToProps = state => ({
  restaurants: state.restaurants.records,
  loading: state.restaurants.loading,
  error: state.restaurants.error,
});

const mapDispatchToProps = {
  loadRestaurants,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
