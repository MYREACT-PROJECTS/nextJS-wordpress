import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const defaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
};

/**
 * Instantiate required constructor fields
 */
 //"https://aromainsider-5588a5.ingress-baronn.easywp.com/graphql"
const link = createHttpLink({
    // uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
    uri: "https://aromainsider-5588a5.ingress-baronn.easywp.com/graphql"
    //"http://localhost:8020/graphql",
});

const cache = new InMemoryCache({
    resultCaching: false,
});

const client = new ApolloClient({
   link,
    // uri: 'http://localhost:8020/graphql',
   // uri: 'https://48p1r2roz4.sse.codesandbox.io',
 // cache: new InMemoryCache()
    cache,
    //link,
    defaultOptions: defaultOptions,
});


export default client;