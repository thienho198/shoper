import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import defaultReducer from './reducers/defaultReducer';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  default: defaultReducer,
});

export const store = createStore(rootReducer, state, composeEnhancers(applyMiddleware(thunk)));
