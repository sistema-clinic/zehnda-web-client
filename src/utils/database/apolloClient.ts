/**********************************************************
 * Componente: apolloClient
 * Desarrolador: Carlos Morante
 * Descripción: Clase utilitaria para manejar las peticiones al backend usando apollo
 * Feha: 20 Diciembre 2024
***********************************************************/
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client';
import gql from 'graphql-tag'
import { onError } from "@apollo/client/link/error";

/**
 * cliente para realizar consultas al backend
 * @param query la consulta a realizar
 * @param variables las variables de la consulta
 * @param endpoint la url de Graphql
 * @param headers encabezados necesarios para la consulta
 * @returns json de la consulta
 */
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

/**
 * cliente para realizar mutaciones al backend
 * @param query la consulta a realizar
 * @param variables las variables de la consulta
 * @param endpoint la url de Graphql
 * @param headers encabezados necesarios para la consulta
 * @returns 
 */
export const clientMutation = async (query: string | readonly string[], variables: any, endpoint: string, headers: any = {}) => {

	const authLink = new ApolloLink((operation, forward) => {
		// Use the setContext method to set the HTTP headers.
		operation.setContext({
			headers: {
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