import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './pages/App'
import 'semantic-ui-css/semantic.min.css'
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.css'

import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

let endpoint

if (window._env_.REACT_APP_LDS === undefined) {
  endpoint = 'http://localhost:9090/'
} else {
  endpoint = window._env_.REACT_APP_LDS

  if (!endpoint.endsWith('/')) {
    endpoint = window._env_.REACT_APP_LDS + '/'
  }
}

const client = new ApolloClient({
  uri: 'http://35.228.232.124/graphql'
});

console.log("Environment is: ", window._env_)

const properties = {
  name: 'GSIM',
  producer: 'GSIM',
  endpoint: endpoint,
  namespace: 'data/',
  route: '/gsim/',
  languageCode: 'en',
  specialFeatures: true,
  user: 'Test'
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App {...properties} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
