import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { createRestaurant } from '../store/actions';

export const RestaurantForm = ({ createRestaurant }) => {
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    if (!name) {
      return setValidationError(true);
    }
    setValidationError(false);
    return createRestaurant(name).then(() => setName(''));
  };

  return (
    <form onSubmit={handleSubmit}>
      {validationError && <Alert severity="error">Name is required</Alert>}
      <TextField
        placeholder="Restaurant Name"
        fullWidth
        margin="normal"
        variant="outlined"
        value={name}
        label="Restaurant Name"
        onChange={e => setName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        data-testid="new-restaurant-submit-button"
        type="submit"
        fullWidth
      >
        Add
      </Button>
    </form>
  );
};

const mapDispatchToProps = { createRestaurant };

export default connect(null, mapDispatchToProps)(RestaurantForm);
