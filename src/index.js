import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware, compose} from 'redux';
import { cartReducer } from './reducers';
import { Provider } from 'react-redux';
import BookService from './services/BookServices';
import thunk from "redux-thunk"

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const bookService = new BookService();

let initialState = [];

// bookService.getCartItems('bookstore_user/get_cart_items')
//   .then((res)=>{
//     console.log(res);
//     initialState = res.data.result;
//   })
//   .catch((err)=>{
//     console.log(err);
//   })

const myStore = createStore(
  cartReducer, initialState, enhancer
);

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
