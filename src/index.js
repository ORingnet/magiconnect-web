import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-pagination/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/other.css';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import Intl from './Intl';
import * as serviceWorker from './serviceWorker';
const initialState = window.initialReduxState;
const history = createBrowserHistory();
const store = configureStore(history, initialState);
const app = (
  <Provider store={store}>
    <Intl />
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
