import React from 'react';
import { Provider } from 'react-redux';
import { Restaurants } from './components';
import store from './store';

const App = () => (
  <div>
    <Provider store={store}>
      <Restaurants />
    </Provider>
  </div>
);

export default App;
