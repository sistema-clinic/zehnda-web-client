import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, defaultDataIdFromObject } from '@apollo/client';
import gql from 'graphql-tag'
import { onError } from "@apollo/client/link/error";

export const clientQuery = async (query: string | readonly string[], variables: any, endpoint: string, headers: any = {}) => {
    const authLink = new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: headers
        });
    
        return forward(operation);
    });
    
    const client = new ApolloClient({
        link: authLink.concat(ApolloLink.from([
        onError(({ response, graphQLErrors, networkError, operation, forward }) => {

        }),
            new HttpLink({
                uri: endpoint,
            })
        ])),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                
            },
        }
    });
    
    return await client
    .query({
        query: gql(query),
        variables: variables,
    })
    .then(res => {
        return new Promise((resolve, reject) => {
        resolve(res.data)
        });
    })
    .catch(error => {
        return new Promise((resolve, reject) => {
        reject(error)
        });
    })
}
export const clientMutation = async (query: string | readonly string[], variables: any, endpoint: string, headers: any = {}) => {

	const authLink = new ApolloLink((operation, forward) => {
		// Use the setContext method to set the HTTP headers.
		operation.setContext({
			headers: {
				"x-api-key": import.meta.env.VITE_GOOGLE_APIKEY,
                ...headers
			}
		});

		// Call the next link in the middleware chain.
		return forward(operation);
	});

	const client = new ApolloClient({
        link: authLink.concat(ApolloLink.from([
            onError(({ response, graphQLErrors, networkError, operation, forward }) => {
    
            }),
                new HttpLink({
                    uri: endpoint,
                })
            ])),
        cache: new InMemoryCache(),
	});

	return await client
		.mutate({
			mutation: gql(query),
			variables: variables,
		})
		.then(res => {
			return new Promise((resolve, reject) => {
				resolve(res.data)
			});
		})
		.catch(error => {
			return new Promise((resolve, reject) => {
				reject(error)
			});
		})
};