import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import defaultReducer from '/client/store/reducers/defaultReducer';

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootReducer = combineReducers({
    default: defaultReducer,
  });
  const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

  return store;
};
