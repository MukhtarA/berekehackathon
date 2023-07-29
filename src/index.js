import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserHistory } from 'history'

const baseUrl = '/1a1992698-513e-40f4-ac37-cea219ec5245/hackathon2'

const history = createBrowserHistory({
    basename: baseUrl
})

ReactDOM.render(
  <React.StrictMode>
    <App history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);

