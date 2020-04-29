import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import appReducer from '../store/appStore/reducer';
import langReducer from '../store/langStore/reducer';
const configureStore = (history, initialState) => {
  const reducers = {
    app: appReducer,
    lang: langReducer
  };
  const middleware = [thunk, routerMiddleware(history)];
  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });
  return createStore(
    rootReducer,
    initialState,
    compose(
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
};

export default configureStore;
