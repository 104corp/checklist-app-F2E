import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import reducers from './reducer';

const logger = store => {
  return next => {
      return action => {
          console.log('[middleware] dispatching', action)
          const result =  next(action)
          console.log('[middleware] next state', store.getState())
          return result
      }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore(reducer, composeEnhancers(applyMiddleware(logger))));
 
export const configureStore = (initialState) => {
  return createStoreWithMiddleware(reducer, initialState);
}
