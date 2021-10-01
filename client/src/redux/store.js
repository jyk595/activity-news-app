import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeMiddleware = applyMiddleware(thunk)
const store = createStore(rootReducer, composeEnhancers(composeMiddleware));

export default store;