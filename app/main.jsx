import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import initReactFastclick from 'react-fastclick';

initReactFastclick();

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement('div'))
);

