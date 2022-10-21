import { combineReducers } from 'redux';
import auth_reducer from './auth-reducer.js';
import app_reducer from './app-reducer.js';

export default combineReducers({
    auth: auth_reducer,
    app: app_reducer,
});