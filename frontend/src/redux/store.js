import { createStore } from "redux";
// Import reducers
import rootReducers from "./rootReducers";

// Create the Redux store
let store = createStore(rootReducers);

// Exporting 'redux store' to use in all components
export default store;
