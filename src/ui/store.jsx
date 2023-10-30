import { createStore, combineReducers } from 'redux';
import yourReducer from './yourReducer';
const rootReducer = combineReducers({
  yourReducer, // Add your reducer to the root reducer
  // Add other reducers if needed
});

const store = createStore(rootReducer);

export default store;
