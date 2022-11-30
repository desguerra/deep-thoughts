import React from 'react';

/* ApolloProvider is a special type of React component that we'll use to provide 
data to all of the other components. */
/* ApolloClient is a constructor function that will help initialize the connection 
to the GraphQL API server. */
/* InMemoryCache enables the Apollo Client instance to cache API response data so 
that we can perform requests more efficiently. */
/* createHttpLink allows us to control how the Apollo Client makes a request. 
Think of it like middleware for the outbound network requests. */
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: '/graphql',
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

/* Note how we wrap the entire returning JSX code with <ApolloProvider>. 
Because we're passing the client variable in as the value for the client 
prop in the provider, everything between the JSX tags will eventually have 
access to the server's API data through the client we set up. */

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />            

              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route
                path="/thought/:id"
                element={<SingleThought />}
              />

              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
