import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.outsidein.dev/u9RK4IcVq1ul4KuSwY9jVoIia70n1Z3D',
});

const api = {
  loadRestaurants: () => client.get('/restaurants').then(response => response.data),
  createRestaurant: payload => client
      .post('/restaurants', { name: payload })
      .then(response => response.data),
};
export default api;
