import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from "./AppContainer";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
