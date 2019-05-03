import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import { client } from './dal/apollo';
import './index.css';

const withApollo = (App: React.FC) => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

ReactDOM.render(withApollo(App), document.getElementById('root'));