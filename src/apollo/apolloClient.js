import {
    ApolloProvider,
    useQuery,
    gql,
    InMemoryCache,
    ApolloClient
  } from "@apollo/client";
  import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
  import { createClient } from 'graphql-ws';
  import { split, HttpLink } from '@apollo/client';
  import { getMainDefinition } from '@apollo/client/utilities';
  
  const httpLink = new HttpLink({
    uri: "https://valid-jaybird-88.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
       'x-hasura-admin-secret' :
          '4W85hKZFI1QzmEYuYFE3ai7b6PcrdYOdmQWZZ4wOA8SXBSizgNzYq4vzCEVPPWw2', 
    },
  });
  
  const wsLink = new GraphQLWsLink(createClient({
    url: 'wss://valid-jaybird-88.hasura.app/v1/graphql',
    connectionParams: {
      headers: {
        'x-hasura-admin-secret' :
          '4W85hKZFI1QzmEYuYFE3ai7b6PcrdYOdmQWZZ4wOA8SXBSizgNzYq4vzCEVPPWw2', 
      },
    }
    
  }));
  
  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
  
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    headers: {
      'x-hasura-admin-secret' :
         '4W85hKZFI1QzmEYuYFE3ai7b6PcrdYOdmQWZZ4wOA8SXBSizgNzYq4vzCEVPPWw2', 
   },
  });
  
  export default client