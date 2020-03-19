

import {combineReducers} from 'redux';

import articleReducer from './articleReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';


const rootReducer = combineReducers({
    article: articleReducer,
    auth: authReducer,
    error: errorReducer
})


export default rootReducer;