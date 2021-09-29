import rootReducer from "./reducers/rootReducer";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeMiddleware = applyMiddleware(thunk)
export const store = createStore(rootReducer, composeEnhancers(composeMiddleware));
