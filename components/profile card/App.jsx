import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AvatarExampleSimple from './AvatarExampleSimple.jsx';

require('./style.css');

const App = () => (
    <MuiThemeProvider>
        <AvatarExampleSimple />
    </MuiThemeProvider>
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);