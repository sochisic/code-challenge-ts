import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GIT_TOKEN}`
  }
});