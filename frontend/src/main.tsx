import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './lib/apollo';
import App from './App';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'Sora, sans-serif',
  headings: { fontFamily: 'Sora, sans-serif' },
  defaultRadius: 'md',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications position="top-right" />
          <App />
        </MantineProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);