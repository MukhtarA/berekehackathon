import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserHistory } from 'history'

const baseUrl = ''

const history = createBrowserHistory({
    basename: baseUrl
})

ReactDOM.render(
  <React.StrictMode>
    <App history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);

