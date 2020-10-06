import React from 'react';
import { Card, CardHeader, Grid } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { RestaurantList, RestaurantForm } from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  cardContent: {
    paddingTop: theme.spacing(0),
  },
}));

const Restaurants = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          <Card className={classes.card}>
            <CardHeader title="Add New" gutterBottom />
            <CardContent className={classes.cardContent}>
              <RestaurantForm />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Card>
            <CardHeader title="Restaurants" gutterBottom />
            <CardContent>
              <RestaurantList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Restaurants;
