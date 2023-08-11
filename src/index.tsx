import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { apiDemoUrl } from "./constants";
import { LIST_SPACES } from './utils/queries'

import { ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
} from '@apollo/client'

const client = new ApolloClient({
  uri: apiDemoUrl,
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const result = client.readQuery({
//   query: LIST_SPACES,
//   variables: {
//     first: 500,
//     skip: 0
//   },
// });

// console.log("DATA: ", result)

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
