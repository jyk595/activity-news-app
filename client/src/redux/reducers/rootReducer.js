import { combineReducers } from 'redux';
import currentUser from './currentUser';

const rootReducer = combineReducers({ 
  user: currentUser 
})

export default rootReducer;