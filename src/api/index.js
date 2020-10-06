import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://outside-in-dev-api.herokuapp.com/Asa1yPGao9bjYoRk0qeTzaQ91tCb6Y8H',
});

const api = {
  loadRestaurants: () => client.get('/restaurants').then(response => response.data),
  createRestaurant: payload => client
      .post('/restaurants', { name: payload })
      .then(response => response.data),
};
export default api;
