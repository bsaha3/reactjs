import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButtonExampleSimple from './FloatingActionButtonExampleSimple.jsx';
 
const App = () => (
  <MuiThemeProvider>
    <FloatingActionButtonExampleSimple />
  </MuiThemeProvider>
);
 
ReactDOM.render(
  <App />,
  document.getElementById('app')
);