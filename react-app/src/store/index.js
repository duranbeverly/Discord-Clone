import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import userConversations from './userconversations'
import userConversationMessages from './userConversationMessages'
import session from './session'
import servers from './servers';
import users from './users'
import channels from './channels'
import onlineStatus from "./onlineStatusStore"

const rootReducer = combineReducers({
  session,
  userConversations,
  userConversationMessages,
  servers,
  users,
  channels, 
  onlineStatus
});


let enhancer;

if (import.meta.env.PROD) {
  enhancer = applyMiddleware(thunk);
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
