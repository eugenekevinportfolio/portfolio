import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers/index.js";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

// const middleware = applyMiddleware(thunk, logger);
// DEV
// const store = createStore(allReducers, middleware);

// PRODUCTION
const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();

export default store;
