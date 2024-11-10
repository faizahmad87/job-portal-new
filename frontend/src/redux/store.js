// src/redux/store.js

import {createStore} from 'redux';
import reducer from './reducers';

// Create the Redux store with the reducer
const store = createStore(reducer);

export default store;
