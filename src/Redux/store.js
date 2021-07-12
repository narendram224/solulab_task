import {createStore, applyMiddleware} from 'redux';
import rootReducers from './rootReducers';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import wsMiddleware from './socket/SocketAction';

const store = createStore(rootReducers,composeWithDevTools(applyMiddleware(logger,thunk,wsMiddleware)));
export default store;