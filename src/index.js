import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import rootSaga from "./sagas/rootSagas";
import createSagaMiddleware from "redux-saga";
import App from './components/App';
import rootReducer from './reducers';
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const logger = ({ dispatch, getState }) => (next) => (action) => {
  console.log('ACTION', action);
  next(action);
};

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware)); 
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
