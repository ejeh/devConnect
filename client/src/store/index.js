import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

const middleWare = [thunk];
const configureStore = () => {
  return createStore(reducers,
     compose(applyMiddleware(...middleWare),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     ));
};

export default configureStore;
