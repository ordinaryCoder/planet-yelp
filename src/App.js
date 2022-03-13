import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import PlanetSearch from "./components/PlanetSearch";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Planet from "./components/Planet";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import Status from "./components/Status";

const httpLink = new HttpLink({
  uri: "https://planet-testapp.herokuapp.com/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "admin",
  },
});

const wsLink = new WebSocketLink({
  uri: `ws://planet-testapp.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": "admin",
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/planet/:id" component={Planet} />
          <Route path="/" component={PlanetSearch} />
          <Route path="/status" component={Status} />
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
