import './App.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import PlanetSearch from './components/PlanetSearch';

const link = new HttpLink({
  uri:"https://planet-testapp.herokuapp.com/v1/graphql",
  headers: {
    'x-hasura-admin-secret': "admin"
  }
});

const client = new ApolloClient({
  cache:new InMemoryCache(),
  link,
})

const App=()=> {
  return(
  <ApolloProvider client={client}>
    <PlanetSearch />
  </ApolloProvider>
  )
  
}

export default App;
