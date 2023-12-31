import ReactDOM from 'react-dom/client';
import App from './App';
import React from 'react';
import reportWebVitals from './reportWebVitals';
import { apiProductionUrl } from "./constants";
import store from './reducers/store'
import { Provider } from 'react-redux'
import './index.css'


import { ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
} from '@apollo/client'

const client = new ApolloClient({
  uri: apiProductionUrl, 
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log("store: ", store.getState())

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
