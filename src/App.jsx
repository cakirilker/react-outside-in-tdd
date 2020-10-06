import React from 'react';
import { Provider } from 'react-redux';
import { blue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import {
  createMuiTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@material-ui/core';
import store from './store';
import { Restaurants } from './containers';

const theme = createMuiTheme({
  palette: { primary: blue },
});

const App = () => (
  <div>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Opinion Ate</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Restaurants />
        </Container>
      </ThemeProvider>
    </Provider>
  </div>
);

export default App;
