import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import promiseMiddleware from 'redux-promise-middleware';

const middleware = [thunk];
const logger = createLogger({});

// const loggerMiddleware = store => next => action => {
//   console.log('dispatching: ', action);
//   next(action);
// };

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware, promiseMiddleware, logger))
);

export default store;
