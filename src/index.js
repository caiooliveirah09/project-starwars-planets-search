import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MyContext from './provider'

ReactDOM.render(
  <MyContext>
    <App />
  </MyContext>,
  document.getElementById('root')
);
