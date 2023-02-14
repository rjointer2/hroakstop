import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#09f166',
      
    },
  },
});

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql"
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  )
}